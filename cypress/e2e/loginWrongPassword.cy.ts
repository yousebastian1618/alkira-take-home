import fixture from '../fixtures/example.json';

describe('Login with wrong password', () => {
  const users = fixture.users;
  const adminMFAUser = users.find((u) => u.role === 'admin' && u.mfa);

  it('shows error when password is wrong', () => {
    expect(adminMFAUser, 'admin MFA user exists in fixtures').to.exist;

    cy.intercept('POST', '**/api/v1/auth/login*').as('login');

    cy.visit('/login');

    cy.get('input[name="email"]').type(adminMFAUser!.email);
    cy.get('input[name="password"]').type('WrongPassword123');

    cy.contains('button', /^LOGIN$/i).click();

    const waitForFinal = (alias: string): Cypress.Chainable<any> =>
      cy.wait(alias).then((interception) => {
        const code = interception.response?.statusCode ?? 0;
        if ([301, 302, 307, 308].includes(code)) {
          return waitForFinal(alias);
        }
        expect(code, 'final login status').to.be.oneOf([400, 401, 404]);
        return interception;
      });

    return waitForFinal('@login').then(() => {
      cy.contains('Either your email or password is wrong. Please try again.', { timeout: 4000 })
        .should('be.visible');
    });
  });
});
