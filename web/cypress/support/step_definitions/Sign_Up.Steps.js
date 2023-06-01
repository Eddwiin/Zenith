/// <reference types="cypress" />
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import SignUpPo from "../page_objects/Sign_Up_PO";

const SIGN_UP_PO = new SignUpPo();

Given('I navigate to the sign up page', () => {
    SIGN_UP_PO.navigateToSignUpPage();
})

When('I type a first name with {}', (firstName) => {

})

When('I type a last name with {}', (lastName) => {

})

When('I type an email with {}', (email) => {

})

When('I type a password with {}', (password) => {

})

When('I confirm the password with {}', (confirmPassword) => {

})


When('I click to the sign up button', () => {

})

Then('I should be display a message with {}', (expectedMessage) => {

})