describe('Health Check', () => {
  it('shows success status when health-check button is clicked', () => {
    cy.visit('/');

    cy.contains('button', /^Health Check$/i).click();

    cy.contains('Health Check').should('be.visible');
    cy.wait(2000);
    cy.contains('OK').should('be.visible');

    cy.wait(4000);
    cy.contains('OK').should('not.exist');
  });
});
