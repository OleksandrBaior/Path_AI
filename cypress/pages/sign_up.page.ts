import constants from "../resourcers/constants.json";

class Sign_up {
  form = {
    sign_up_to_an_account_btn: () => cy.get(".fi-link > .font-semibold"),
    sign_up_for_an_account_btn: () =>
      cy.get(".fi-simple-header-subheading > .fi-link > .font-semibold"),
    first_name_inp: () => cy.get("input#data\\.name"),
    last_name_inp: () => cy.get("input#data\\.lastname"),
    sign_up_btn: () => cy.get(".fi-btn"),
    email_inp: () => cy.get("input#data\\.email"),
    phone_inp: () => cy.get("input#data\\.phone"),
    country_select: () => cy.get(".iti__selected-country-primary"),
    search_input: () => cy.get(".iti__search-input"),
    first_contry_code: () => cy.get("#iti-0__item-gb"),
    contact_center_name_inp: () => cy.get("input#data\\.contact_centre_name"),
    password_inp: () => cy.get("input#data\\.password"),
    password_confirm_inp: () => cy.get("input#data\\.passwordConfirmation"),
    password_error: () => cy.get(".fi-fo-field-wrp-error-message"),
    password_eye: () =>
      cy
        .get(
          "div.fi-input-wrp-suffix button.fi-icon-btn.relative.flex.items-center",
        )
        .eq(0),
    password_confirm_eye: () =>
      cy
        .get(
          "div.fi-input-wrp-suffix button.fi-icon-btn.relative.flex.items-center",
        )
        .eq(2),
  };
  verifyInvalidValues(
    list: Array<string>,
    field: Cypress.Chainable<JQuery<HTMLElement>>,
  ): void {
    list.forEach((element) => {
      field.type(element);
      field.should(
        "have.css",
        "border-color",
        constants.styleElement.errorBorder,
      );
      this.form.sign_up_btn().click();
      field.clear();
    });
  }

  verifyInvalidEmails(emails: Array<string>): void {
    this.verifyInvalidValues(emails, this.form.email_inp());
  }

  verifyInvalidPasswords(passwords: Array<string>): void {
    this.verifyInvalidValues(passwords, this.form.password_inp());
  }

  verifyPasswordEyeVisibility(visible: boolean): void {
    const expected = visible ? "flex" : "none";

    this.form.password_eye().should("have.css", "display", expected);
    this.form.password_confirm_eye().should("have.css", "display", expected);
  }

  verifyHidderVisiblePassword(): void {
    this.verifyPasswordEyeVisibility(true);
    this.form.password_eye().click();
    this.form.password_confirm_eye().click();
    this.verifyPasswordEyeVisibility(false);
  }

  verfiyEnteredPhoneNumber(phone: string): void {
    this.form
      .phone_inp()
      .invoke("val")
      .then((value: string) => {
        expect(value.replace(/\s/g, "")).to.equal(`0${phone}`);
      });
  }
}
export default new Sign_up();
