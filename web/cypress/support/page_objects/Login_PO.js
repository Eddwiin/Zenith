/// <reference types="cypress" />

import BasePO from "./Base_PO";

class LoginPO extends BasePO {
    emailSelector = '[data-cy="email-input-login"]';
    passwordSelector = '[data-cy="password-input-login"]';;
    submitBtnSelector = '[data-cy="submit-button-login"]';

    navigateToLoginPage() {
        cy.fixture("config.json").then(data => {
            super.navigate(data.loginUrl)
        })
    }

    typeEmail(email) {
        cy.get(this.emailSelector).type(email);
    }

    typePassword(password) {
        cy.get(this.passwordSelector).type(password);
    }

    clickOnSubmitBtn() {
        cy.get(this.submitBtnSelector).click({ force: true });
    }
}

export default LoginPO;