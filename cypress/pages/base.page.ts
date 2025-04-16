class Base {
  visit(path: string) {
    cy.visit(path);
  }

  verify_url(value: 'login' | 'register'): void {
    cy.url().should('include', value);
  }

  verifyErrorBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>, color: string): void {
    element().should('have.css', 'box-shadow').and('include', color);
  }

  verifyErrorRedBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>, color: string): void {
    element().should('have.css', 'border-color', color);
  }
}
export default Base;
