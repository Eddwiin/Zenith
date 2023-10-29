/// <reference types="cypress" />

import BasePO from "./Base_PO";

class RegistrationPO extends BasePO {
    firstNameSelector = '[data-cy="firstName-input-registration"]';
    lastNameSelector = '[data-cy="lastName-input-registration"]';
    emailSelector = '[data-cy="email-input-registration"]';
    passwordSelector = '[data-cy="password-input-registration"]';
    confirmPasswordSelector = '[data-cy="confirmation-password-input-registration"]';
    submitBtnSelector = '[data-cy="submit-button-registration"]';

    navigateToSignUpPage() {
        cy.fixture("config.json").then(data => {
            super.navigate(data.registrationUrl)
        })
    }

    typeFirstName(firstName) {
        cy.get(this.firstNameSelector).type(firstName)
    }

    touchFirstNameInput() {
        cy.get(this.firstNameSelector)
            .invoke('val', '')
            .focus()
            .blur()
    }

    typeLastName(lastName) {
        cy.get(this.lastNameSelector).type(lastName)
    }

    touchLastNameInput() {
        cy.get(this.lastNameSelector)
        .invoke('val', '')
        .focus()
        .blur()
    }

    typeEmail(email) {
        cy.get(this.emailSelector).type(email)
    }


    touchEmailInput() {
        cy.get(this.emailSelector)
        .invoke('val', '')
        .focus()
        .blur()
    }

    typePassword(password) {
        cy.get(this.passwordSelector).type(password)
    }

    touchPasswordInput() {
        cy.get(this.passwordSelector)
        .invoke('val', '')
        .focus()
        .blur()
    }

    typeConfirmationPassword(confirmationPassword) {
        cy.get(this.confirmPasswordSelector).type(confirmationPassword)
    }

    toucheConfirmationPassword() {
        cy.get(this.confirmPasswordSelector)
        .invoke('val', '')
        .focus()
        .blur()
    }

    clickOnSubmitBtn() {
        cy.get(this.submitBtnSelector).click({ force: true });
    }

}

export default RegistrationPO