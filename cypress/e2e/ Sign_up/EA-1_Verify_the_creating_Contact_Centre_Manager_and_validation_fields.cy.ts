import { roles } from '../../support/roles';
import sign_up from '../../pages/sign_up.page';
import { randomValue } from '../../support/utils';
import constants from '../../resourcers/constants.json';
import endpoits from '../../resourcers/endpoints.json';

describe('EA-1', () => {
  it('Verify the creating Contact Centre Manager and validation fields', () => {
    const firstName = randomValue('firstName') as string;
    const lastName = randomValue('lastName') as string;
    const email = randomValue('email') as string;
    const name = randomValue('name') as string;
    const phone = `201555${randomValue('phone')}` as string;

    // Visit the Sign up page
    sign_up.visit(roles.CCM.url);

    // Verify Sign up and Sign in buttons
    sign_up.form.sign_up_for_an_account_btn().click();
    sign_up.verifyUrl('register');
    sign_up.form.sign_up_to_an_account_btn().click();
    sign_up.verifyUrl('login');
    sign_up.form.sign_up_for_an_account_btn().click();

    // First name
    sign_up.verifyNextEmptyField(() => sign_up.form.first_name_inp_border());
    sign_up.form.first_name_inp().type(firstName);
    sign_up.verifyEnteredValue(sign_up.form.first_name_inp(), firstName);

    // Last name
    sign_up.verifyNextEmptyField(() => sign_up.form.last_name_inp_border());
    sign_up.form.last_name_inp().type(lastName);
    sign_up.verifyEnteredValue(sign_up.form.last_name_inp(), lastName);

    // Email
    sign_up.verifyNextEmptyField(() => sign_up.form.email_inp_border());
    sign_up.verifyInvalidEmails(sign_up.form.email_inp, sign_up.form.email_inp_border, constants.invalidEmails);
    sign_up.form.email_inp().type(email);
    sign_up.verifyEnteredValue(sign_up.form.email_inp(), email);

    // Phone
    sign_up.verifyNextEmptyField(() => sign_up.form.phone_inp_border());
    sign_up.form.country_select().click();
    sign_up.form.search_input().type(constants.country[0]);
    sign_up.form.first_contry_code().click();
    sign_up.form.phone_inp().type(phone);
    sign_up.verfiyEnteredPhoneNumber(phone);
    sign_up.form.phone_inp().should('have.css', 'border-color', constants.styleElement.activeBorder);

    // Contact center name
    sign_up.verifyNextEmptyField(() => sign_up.form.contact_center_name_inp_border());
    sign_up.form.contact_center_name_inp().type(name);
    sign_up.verifyEnteredValue(sign_up.form.contact_center_name_inp(), name);

    // Password
    sign_up.verifyNextEmptyField(() => sign_up.form.password_inp_border());
    sign_up.verifyInvalidPasswords(sign_up.form.password_inp, sign_up.form.password_inp_border, constants.invalidPasswords);
    sign_up.inputPassword(sign_up.form.password_inp(), constants.validPassword[0]);
    // Confrm password
    sign_up.verifyNextEmptyField(() => sign_up.form.password_confirm_inp_border());
    sign_up.inputPassword(sign_up.form.password_confirm_inp(), constants.validPassword[1]);
    sign_up.form.sign_up_btn().click();
    sign_up.form.password_error().should('contain', constants.errorMessages.passwordError);
    sign_up.form.password_inp().should('have.css', 'border-color', constants.styleElement.errorRedBorder);
    sign_up.form.password_confirm_inp().clear();
    sign_up.inputPassword(sign_up.form.password_confirm_inp(), constants.validPassword[0]);

    // Verify password visibility eyes
    sign_up.verifyHidderVisiblePassword();

    // Sign up
    // sign_up.form.sign_up_btn().click();
    // sign_up.verifyUrl('login');
  });
});
