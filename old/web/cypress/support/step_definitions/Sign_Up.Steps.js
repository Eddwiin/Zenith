/// <reference types="cypress" />
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import SignUpPo from "../page_objects/Sign_Up_PO";

const SIGN_UP_PO = new SignUpPo();

Given('I navigate to the sign up page', () => {
    SIGN_UP_PO.navigateToSignUpPage();
})

When('I type a first name with {}', (firstName) => {
    (firstName) ? SIGN_UP_PO.typeFirstName(firstName) : SIGN_UP_PO.touchFirstNameInput();
})

When('I type a last name with {}', (lastName) => {
    (lastName) ? SIGN_UP_PO.typeLastName(lastName) : SIGN_UP_PO.touchLastNameInput();

})

When('I type an email with {}', (email) => {
    (email) ? SIGN_UP_PO.typeEmail(email) : SIGN_UP_PO.touchEmailInput();
})

When('I type a password with {}', (password) => {
    (password) ? SIGN_UP_PO.typePassword(password) : SIGN_UP_PO.touchPasswordInput();
})

When('I confirm the password with {}', (confirmPassword) => {
    (confirmPassword) ? SIGN_UP_PO.typeConfirmPassword(confirmPassword) : SIGN_UP_PO.touchConfirmPasswordInput();
})


When('I click to the sign up button', () => {
    SIGN_UP_PO.clickOnSubmitBtn();
})

Then('I should be display a message with {}', (expectedMessage) => {
    cy.get('body').contains(expectedMessage);
})