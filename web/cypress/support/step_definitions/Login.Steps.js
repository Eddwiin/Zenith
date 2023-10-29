const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { default: LoginPO } = require("../page_objects/Login_PO");

const Login_PO = new LoginPO();

Given('I navigate to login page - Login', () => {
    Login_PO.navigateToLoginPage();
})

When('I type an email with {} - Login', (email) => {
    Login_PO.typeEmail(email)
})

When('I type a password with {} - Login', (password) => {
    Login_PO.typePassword(password)
})

When('I click on submit button - Login', () => {
    Login_PO.clickOnSubmitBtn()
})

Then('I am redirect to {} with the message {} - Login', (urlToRedirect, expectedMessage) => {
    cy.url().should('include', urlToRedirect);
    cy.get('body').contains(expectedMessage);
})