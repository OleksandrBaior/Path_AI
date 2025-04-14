class Base {
  visit(path: string) {
    cy.visit(path);
  }

  verifyUrl(value: 'login' | 'register'): void {
    cy.url().should('include', value);
  }

  verifyErrorBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>): void {
    element().should('have.css', 'box-shadow').and('include', 'rgb(217, 119, 6)');
  }

  verifyErrorRedBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>, value: string): void {
    element().should('have.css', 'border-color', value);
  }
}
export default Base;
