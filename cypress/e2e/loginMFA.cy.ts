import data from '../fixtures/example.json';

describe('Login with MFA and complete MFA', () => {
  const users = data.users;
  const adminMFAUser = users.find((u) => u.role === 'admin' && u.mfa)!;

  it("Log in with MFA", () => {
    cy.intercept('POST', "**/api/v1/auth/login*").as("login");
    cy.intercept("POST", "**/api/v1/auth/mfa*").as("mfa");

    cy.visit('/login')

    cy.get('input[name=email]').type(adminMFAUser.email);
    cy.get('input[name=password]').type(adminMFAUser.password);
    cy.contains('button', /^LOGIN$/i).click();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    function waitFor200(alias: string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return cy.wait(alias).then((interception) => {
        const code = interception.response?.statusCode;
        if (code === 308 || code === 301 || code === 302) {
          return waitFor200(alias);
        }
        expect(code, 'final login status').to.be.oneOf([200, 201]);
        return interception;
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    waitFor200('@login').then(({response}) => {
      const body = response?.body || {};
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(body.code).to.be.a('string').and.not.be.empty;
      expect(body.token).to.be.a('string').and.not.be.empty;

      cy.url().should('include', `/mfa/${body.token}`);

      cy.get('input[name="code"]').type(body.code);
      cy.contains('button', /^AUTHENTICATE$/i).click();
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    function waitMFA200() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return cy.wait('@mfa').then((interception) => {
        const code = interception.response?.statusCode;
        if (code === 308 || code === 301 || code === 302) {
          return waitMFA200();
        }
        expect(code, 'final mfa status').to.be.oneOf([200, 201]);
        return interception;
      });
    }

    waitMFA200();

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.contains(adminMFAUser.email).should('be.visible');
    cy.contains('button', /^Logout$/i).should('exist');
  })
});
