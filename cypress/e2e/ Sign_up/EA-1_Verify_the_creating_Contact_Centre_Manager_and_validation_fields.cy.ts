import { roles } from "../../support/roles";
import sign_up from "../../pages/sign_up.page";

describe("EA-1", () => {
  it("Verify the creating Contact Centre Manager and validation fields", () => {
    const CCM = roles.CCM.url;
    cy.visit(CCM);

    sign_up.form.sign_up_for_an_account_btn().click();
    cy.url().should("include", "/register");
    sign_up.form.sign_up_btn().click();
    sign_up.form.first_name_inp().type("Test");
    sign_up.form.last_name_inp().type("Test");
  });
});
