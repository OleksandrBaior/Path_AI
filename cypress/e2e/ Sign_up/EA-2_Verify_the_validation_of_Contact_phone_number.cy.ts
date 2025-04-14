import { roles } from '../../support/roles';
import sign_up from '../../pages/sign_up.page';
import { randomValue } from '../../support/utils';
import constants from '../../resourcers/constants.json';

describe('EA-2', () => {
  it('Verify the validation of Contact phone number', () => {
    const firstName = randomValue('firstName') as string;
    const lastName = randomValue('lastName') as string;
    const email = randomValue('email') as string;
    const name = randomValue('name') as string;
    const phone = `201555${randomValue('phone')}` as string;

    // Fill out the form
    sign_up.visit(roles.CCM.url);
    sign_up.sign_up_for_an_account_btn().click();
    sign_up.first_name_inp().type(firstName);
    sign_up.last_name_inp().type(lastName);
    sign_up.email_inp().type(email);

    // Phone
    sign_up.country_select().click();
    sign_up.search_input().type(constants.country[0]);
    sign_up.first_contry_code().click();
    sign_up.verify_invalid_phone_number(sign_up.phone_inp, constants.phone.invalidPhoneNumber);

    // Fill out the form
    sign_up.contact_center_name_inp().type(name);
    sign_up.inputPassword(sign_up.password_inp(), constants.validPassword[0]);
    sign_up.inputPassword(sign_up.password_confirm_inp(), constants.validPassword[0]);
    sign_up.sign_up_btn().click();

    // Phone
    sign_up.phone_inp().type(phone);
    sign_up.verfiyEnteredPhoneNumber(sign_up.phone_inp, phone);
  });
});
