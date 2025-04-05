import { first } from "cypress/types/lodash";

class Sign_up {
  form = {
    sign_up_for_an_account_btn: () =>
      cy.get(".fi-simple-header-subheading > .fi-link > .font-semibold"),
    first_name_inp: () => cy.get("input#data\\.name"),
    last_name_inp: () => cy.get("input#data\\.lastname"),
    sign_up_btn: () => cy.get(".fi-btn"),
  };
}

export default new Sign_up();
