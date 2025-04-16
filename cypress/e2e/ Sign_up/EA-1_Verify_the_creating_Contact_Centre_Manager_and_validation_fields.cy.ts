import { roles } from '../../support/roles';
import sign_up from '../../pages/sign_up.page';
import { randomValue } from '../../support/utils';
import constants from '../../resourcers/constants.json';
import endpoints from '../../resourcers/endpoints.json';

describe('EA-1', () => {
  it('Verify the creating Contact Centre Manager and validation fields', () => {
    const firstName = randomValue('firstName') as string;
    const lastName = randomValue('lastName') as string;
    const email = randomValue('email') as string;
    const name = randomValue('name') as string;
    const phone = `201555${randomValue('phone')}` as string;

    // Visit the Sign up page
    sign_up.visit(roles.CCM.url + endpoints.login);

    // Verify Sign up and Sign in buttons
    sign_up.sign_up_for_an_account_btn().click();
    sign_up.verify_url('register');
    sign_up.sign_up_to_an_account_btn().click();
    sign_up.verify_url('login');
    sign_up.sign_up_for_an_account_btn().click();

    // First name
    sign_up.verifyNextEmptyField(() => sign_up.first_name_inp_border());
    sign_up.first_name_inp().type(firstName);
    sign_up.verifyEnteredValue(sign_up.first_name_inp(), firstName);

    // Last name
    sign_up.verifyNextEmptyField(() => sign_up.last_name_inp_border());
    sign_up.last_name_inp().type(lastName);
    sign_up.verifyEnteredValue(sign_up.last_name_inp(), lastName);

    // Email
    sign_up.verifyNextEmptyField(() => sign_up.email_inp_border());
    sign_up.verifyInvalidEmails(sign_up.email_inp, sign_up.email_inp_border, constants.invalidEmails);
    sign_up.email_inp().type(email);
    sign_up.verifyEnteredValue(sign_up.email_inp(), email);

    // Phone
    sign_up.verifyNextEmptyField(() => sign_up.phone_inp_border());
    sign_up.country_select().click();
    sign_up.search_input().type(constants.country[0]);
    sign_up.first_contry_code().click();
    sign_up.phone_inp().type(phone);
    sign_up.verfiyEnteredPhoneNumber(sign_up.phone_inp, phone);
    sign_up.verifyErrorRedBorderColor(sign_up.phone_inp, constants.styleElement.activeBorder);

    // Contact center name
    sign_up.verifyNextEmptyField(() => sign_up.contact_center_name_inp_border());
    sign_up.contact_center_name_inp().type(name);
    sign_up.verifyEnteredValue(sign_up.contact_center_name_inp(), name);

    // Password
    sign_up.verifyNextEmptyField(() => sign_up.password_inp_border());
    sign_up.verifyInvalidPasswords(sign_up.password_inp, sign_up.password_inp_border, constants.invalidPasswords);
    sign_up.inputPassword(sign_up.password_inp(), constants.validPassword[0]);
    // Confrm password
    sign_up.verifyNextEmptyField(() => sign_up.password_confirm_inp_border());
    sign_up.inputPassword(sign_up.password_confirm_inp(), constants.validPassword[1]);
    sign_up.sign_up_btn().click();
    sign_up.password_error().should('contain', constants.errorMessages.passwordError);
    sign_up.verifyErrorRedBorderColor(sign_up.password_inp, constants.styleElement.errorRedBorder);
    sign_up.password_confirm_inp().clear();
    sign_up.inputPassword(sign_up.password_confirm_inp(), constants.validPassword[0]);

    // Verify password visibility eyes
    sign_up.verifyHidderVisiblePassword();

    // Sign up
    // sign_up.sign_up_btn().click();
    // sign_up.verify_url('login');

    // Verify the email
    // 1. Confirm the email via the link in the greeting email
    // 2. User is redirected into the contact centre panel
    // 3. Once registration is confirmed all of the Admins receive the notification email about a new contact centrer
  });
});
