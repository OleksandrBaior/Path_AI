import { roles } from '../../../support/roles';
import sign_in from '../../../pages/  registration.page';
import endpoints from '../../../resourcers/endpoints.json';

describe('EA-4_Verify Signin and Logout of Admin/CCM with valid Email and Password with confirmed email', () => {
  function fill_login_filds(email: string, password: string): void {
    sign_in.email_inp().type(email);
    sign_in.verifyEnteredValue(sign_in.email_inp(), email);
    sign_in.inputPassword(sign_in.password_inp(), password);
    sign_in.verifyEnteredValue(sign_in.password_inp(), password);
  }

  function check_remember_me(): void {
    sign_in.remember_me().click();
    sign_in.remember_me().should('be.checked');
  }

  it('Login CCM with remember me checkbox', () => {
    sign_in.visit(roles.CCM.url + endpoints.login);

    fill_login_filds(roles.CCM.email, roles.CCM.password);
    check_remember_me();
    sign_in.sign_up_btn().click();
    sign_in.verify_url(endpoints.view_contact_centre);
  });

  it('Login CCM without remember me checkbox', () => {
    sign_in.visit(roles.CCM.url + endpoints.login);

    fill_login_filds(roles.CCM.email, roles.CCM.password);
    sign_in.sign_up_btn().click();
    sign_in.verify_url(endpoints.view_contact_centre);
  });

  it('Login Admin with remember me checkbox', () => {
    sign_in.visit(roles.ADMIN.url + endpoints.login);

    fill_login_filds(roles.ADMIN.email, roles.ADMIN.password);
    check_remember_me();
    sign_in.sign_up_btn().click();
    sign_in.verify_url(endpoints.admins);
  });

  it('Login Admin without remember me checkbox', () => {
    sign_in.visit(roles.ADMIN.url + endpoints.login);

    fill_login_filds(roles.ADMIN.email, roles.ADMIN.password);
    sign_in.sign_up_btn().click();
    sign_in.verify_url(endpoints.admins);
  });
});
