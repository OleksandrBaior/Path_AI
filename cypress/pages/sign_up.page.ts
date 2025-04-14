import { extend } from 'cypress/types/lodash';
import constants from '../resourcers/constants.json';
import endpoits from '../resourcers/endpoints.json';
import Base from './base.page';

class Sign_up extends Base {
  sign_up_to_an_account_btn = () => cy.get('.fi-link > .font-semibold');
  sign_up_for_an_account_btn = () => cy.get('.fi-simple-header-subheading > .fi-link > .font-semibold');
  sign_up_btn = () => cy.get('.fi-btn');
  // first name
  first_name_inp = () => cy.get('input#data\\.name');
  first_name_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(1) > div > div > div:nth-child(2) > div');
  // last name
  last_name_inp = () => cy.get('input#data\\.lastname');
  last_name_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(2) > div > div > div:nth-child(2) > div');
  // email
  email_inp = () => cy.get('input#data\\.email');
  email_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(3) > div > div > div:nth-child(2) > div');
  // phone
  phone_inp = () => cy.get('input#data\\.phone');
  phone_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(4) > div > div > div:nth-child(2) > div');
  country_select = () => cy.get('.iti__selected-country-primary');
  search_input = () => cy.get('.iti__search-input');
  first_contry_code = () => cy.get('#iti-0__item-gb');
  // contact center name
  contact_center_name_inp = () => cy.get('input#data\\.contact_centre_name');
  contact_center_name_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(5) > div > div > div:nth-child(2) > div');
  // password
  password_inp = () => cy.get('input#data\\.password');
  password_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(6) > div > div > div:nth-child(2) > div');
  password_confirm_inp = () => cy.get('input#data\\.passwordConfirmation');
  password_confirm_inp_border = () => cy.get('#form > div:nth-child(1) > div:nth-child(7) > div > div > div:nth-child(2) > div');
  password_error = () => cy.get('.fi-fo-field-wrp-error-message');
  password_eye = () => cy.get('div.fi-input-wrp-suffix button.fi-icon-btn.relative.flex.items-center').eq(0);
  password_confirm_eye = () => cy.get('div.fi-input-wrp-suffix button.fi-icon-btn.relative.flex.items-center').eq(2);

  verifyInvalidValues(element: () => Cypress.Chainable<JQuery<HTMLElement>>, border: () => Cypress.Chainable<JQuery<HTMLElement>>, lists: Array<string>): void {
    lists.forEach((el) => {
      element().type(el);
      this.verifyErrorBorderColor(border);
      this.sign_up_btn().click();
      element().clear();
    });
  }

  verifyInvalidEmails(
    element: () => Cypress.Chainable<JQuery<HTMLElement>>,
    border: () => Cypress.Chainable<JQuery<HTMLElement>>,
    emails: Array<string>,
  ): void {
    this.verifyInvalidValues(element, border, emails);
  }

  verifyInvalidPasswords(
    element: () => Cypress.Chainable<JQuery<HTMLElement>>,
    border: () => Cypress.Chainable<JQuery<HTMLElement>>,
    passwords: Array<string>,
  ): void {
    this.verifyInvalidValues(element, border, passwords);
  }

  verifyPasswordEyeVisibility(visible: boolean): void {
    const expected = visible ? 'flex' : 'none';

    this.password_eye().should('have.css', 'display', expected);
    this.password_confirm_eye().should('have.css', 'display', expected);
  }

  verifyHidderVisiblePassword(): void {
    this.verifyPasswordEyeVisibility(true);
    this.password_eye().click();
    this.password_confirm_eye().click();
    this.verifyPasswordEyeVisibility(false);
  }

  verfiyEnteredPhoneNumber(phone: string): void {
    this.phone_inp()
      .invoke('val')
      .then((value: string) => {
        expect(value.replace(/\s/g, '')).to.equal(`0${phone}`);
      });
  }

  verifyNextEmptyField(element: () => Cypress.Chainable<JQuery<HTMLElement>>): void {
    this.sign_up_btn().click();
    this.verifyBorderColor(element);
  }

  verifyEnteredValue(element: Cypress.Chainable<JQuery<HTMLElement>>, value: string): void {
    element.should('have.value', value);
    element.should('have.css', 'border-color', constants.styleElement.activeBorder);
  }

  inputPassword(element: Cypress.Chainable<JQuery<HTMLElement>>, value: string): void {
    element.type(value);
    element.should('have.value', value);
  }

  verifyBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>): void {
    this.verifyErrorBorderColor(element);
  }

  verifyErrorBorderColor(element: () => Cypress.Chainable<JQuery<HTMLElement>>): void {
    element().should('have.css', 'box-shadow').and('include', 'rgb(217, 119, 6)');
  }
}
export default new Sign_up();
