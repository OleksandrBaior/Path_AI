import { roles } from '../../support/roles';
import sign_up from '../../pages/sign_up.page';
import { randomValue } from '../../support/utils';
import constants from '../../resourcers/constants.json';
import enpoits from '../../resourcers/endpoints.json';

describe('EA-1', () => {
  it('Verify the creating Contact Centre Manager and validation fields', () => {
    const firstName = randomValue('firstName') as string;
    const lastName = randomValue('lastName') as string;
    const email = randomValue('email') as string;
    const name = randomValue('name') as string;
    const phone = `201555${randomValue('phone')}` as string;

    const CCM = roles.CCM.url;
    cy.visit(CCM);

    // Verify Sign up and Sign in buttons
    sign_up.form.sign_up_for_an_account_btn().click();
    cy.url().should('include', enpoits.register);

    sign_up.form.sign_up_to_an_account_btn().click();
    cy.url().should('include', enpoits.login);

    sign_up.form.sign_up_for_an_account_btn().click();

    // First name
    sign_up.form.sign_up_btn().click();
    sign_up.form.first_name_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.form.first_name_inp().type(firstName);
    sign_up.form.first_name_inp().should('have.value', firstName);
    sign_up.form.first_name_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Last name
    sign_up.form.sign_up_btn().click();
    sign_up.form.last_name_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.form.last_name_inp().type(lastName);
    sign_up.form.last_name_inp().should('have.value', lastName);
    sign_up.form.last_name_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Email
    sign_up.form.sign_up_btn().click();
    sign_up.form.email_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.verifyInvalidEmails(constants.invalidEmails);

    sign_up.form.email_inp().type(email);
    sign_up.form.email_inp().should('have.value', email);
    sign_up.form.email_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Phone
    sign_up.form.sign_up_btn().click();
    sign_up.form.phone_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.form.country_select().click();
    sign_up.form.search_input().type(constants.country[0]);

    sign_up.form.first_contry_code().click();
    sign_up.form.phone_inp().type(phone);
    sign_up.verfiyEnteredPhoneNumber(phone);

    sign_up.form.phone_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Contact center name
    sign_up.form.sign_up_btn().click();
    sign_up.form.contact_center_name_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.form.contact_center_name_inp().type(name);
    sign_up.form.contact_center_name_inp().should('have.value', name);
    sign_up.form.contact_center_name_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Password
    sign_up.form.sign_up_btn().click();
    sign_up.form.password_inp().should('have.css', 'border-color', constants.styleElement.errorBorder);

    sign_up.verifyInvalidPasswords(constants.invalidPasswords);

    sign_up.form.password_inp().type(constants.validPassword[0]);
    sign_up.form.password_inp().should('have.value', constants.validPassword[0]);

    sign_up.form.password_confirm_inp().type(constants.validPassword[1]);
    sign_up.form.password_confirm_inp().should('have.value', constants.validPassword[1]);

    sign_up.form.sign_up_btn().click();
    sign_up.form.password_error().should('contain', constants.errorMessages.passwordError);
    sign_up.form.password_inp().should('have.css', 'border-color', constants.styleElement.errorRedBorder);

    sign_up.form.password_confirm_inp().clear();
    sign_up.form.password_confirm_inp().type(constants.validPassword[0]);
    sign_up.form.password_confirm_inp().should('have.value', constants.validPassword[0]);

    // Verify password visibility eyes
    sign_up.verifyHidderVisiblePassword();

    // Sign up
    sign_up.form.sign_up_btn().click();
    cy.url().should('include', enpoits.login);
  });
});
