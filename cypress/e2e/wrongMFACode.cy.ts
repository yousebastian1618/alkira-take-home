import data from '../fixtures/example.json';

describe('MFA with wrong code', () => {
  const users = data.users;
  const adminMFAUser = users.find((u) => u.role === 'admin' && u.mfa)!;

  it('shows error when MFA code is wrong', () => {
    cy.intercept('POST', '**/api/v1/auth/login*').as('login');
    cy.intercept('POST', '**/api/v1/auth/mfa*').as('mfa');

    cy.visit('/login');

    cy.get('input[name="email"]').type(adminMFAUser.email);
    cy.get('input[name="password"]').type(adminMFAUser.password);
    cy.contains('button', /^LOGIN$/i).click();

    const waitForOk = (alias: string): Cypress.Chainable<any> =>
      cy.wait(alias).then((i) => {
        const code = i.response?.statusCode ?? 0;
        if ([301, 302, 307, 308].includes(code)) return waitForOk(alias);
        expect(code, 'final OK status').to.be.oneOf([200, 201]);
        return i;
      });

    const waitForClientError = (
      alias: string,
      allowed: number[] = [400, 401, 404]
    ): Cypress.Chainable<any> =>
      cy.wait(alias).then((i) => {
        const code = i.response?.statusCode ?? 0;
        if ([301, 302, 307, 308].includes(code)) return waitForClientError(alias, allowed);
        expect(code, 'final error status').to.be.oneOf(allowed);
        return i;
      });

    waitForOk('@login').then(({ response }) => {
      const body = response?.body ?? {};
      expect(body.code, 'MFA code').to.be.a('string').and.not.be.empty;
      expect(body.token, 'MFA token').to.be.a('string').and.not.be.empty;

      cy.url().should('include', `/mfa/${body.token}`);

      cy.get('input[name="code"]').type('000000');
      cy.contains('button', /^AUTHENTICATE$/i).click();
    });

    return waitForClientError('@mfa').then(() => {
      cy.contains('Invalid code', { timeout: 4000 }).should('be.visible');
    });
  });
});
