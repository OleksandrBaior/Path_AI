import { roles } from '../../support/roles';
import sign_up from '../../pages/  registration.page';
import { randomValue } from '../../support/utils';
import constants from '../../resourcers/constants.json';
import endpoints from '../../resourcers/endpoints.json';

describe('EA-3', () => {
  it('Verify the creating Contact Centre Manager with exisiting Email', () => {
    const firstName = randomValue('firstName') as string;
    const lastName = randomValue('lastName') as string;
    const email = randomValue('email') as string;
    const name = randomValue('name') as string;
    const phone = `201555${randomValue('phone')}` as string;

    sign_up.visit(roles.CCM.url + endpoints.register);

    // Fill out the form
    sign_up.first_name_inp().type(firstName);
    sign_up.last_name_inp().type(lastName);

    // Enter an existing email
    sign_up.email_inp().type(constants.exiting_ccm_email);

    // Fill out the form
    sign_up.input_phone_numner(phone);
    sign_up.contact_center_name_inp().type(name);
    sign_up.inputPassword(sign_up.password_inp(), constants.validPassword[0]);
    sign_up.inputPassword(sign_up.password_confirm_inp(), constants.validPassword[0]);
    sign_up.sign_up_btn().click();

    // Verify error message for existing email
    // add verification for error message  and border color //
    sign_up.email_inp().clear();
    sign_up.email_inp().type(email);
    // add verification for error message  and border color  //
  });
});
