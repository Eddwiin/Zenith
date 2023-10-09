/// <reference types="cypress" />

import BasePO from "./Base_PO";

class SignUpPo extends BasePO {
    firstNameSelector = "[data-cy='sign-up-firstname']";
    lastNameSelector = "[data-cy='sign-up-lastName']";
    emailSelector = "[data-cy='sign-up-email']";
    passwordSelector = "[data-cy='sign-up-password']";
    confirmPasswordSelector = "[data-cy='sign-up-confirmPassword']";
    submitBtnSelector = "[data-cy='sign-up-submit']";

    navigateToSignUpPage() {
        cy.fixture("config.json").then(data => {
            super.navigate(data.signUpUrl)
        })
    }

    typeFirstName(firstName) {
        cy.get(this.firstNameSelector).type(firstName);
    }

    touchFirstNameInput() {
        cy.get(this.firstNameSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }

    typeLastName(lastName) {
        cy.get(this.lastNameSelector).type(lastName);
    }

    touchLastNameInput() {
        cy.get(this.lastNameSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }


    typeEmail(email) {
        cy.get(this.emailSelector).type(email);
    }

    touchEmailInput() {
        cy.get(this.emailSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }

    typePassword(password) {
        cy.get(this.passwordSelector).type(password);
    }

    touchPasswordInput() {
        cy.get(this.passwordSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }

    typeConfirmPassword(confirmPassword) {
        cy.get(this.confirmPasswordSelector).type(confirmPassword);
    }

    touchConfirmPasswordInput() {
        cy.get(this.confirmPasswordSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }

    clickOnSubmitBtn() {
        cy.get(this.submitBtnSelector).click();
    }
}

export default SignUpPo;