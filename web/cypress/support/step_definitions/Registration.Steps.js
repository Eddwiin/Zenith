const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { default: RegistrationPO } = require("../page_objects/Registration_PO");

const Registration_PO = new RegistrationPO();

// SCENEARIO OUTTLINE
Given('I navigate to registration page - Registration', () => {
    Registration_PO.navigateToSignUpPage();
})

When('I type a first name with {} - Registration', (firstName) => {
    (firstName) ? Registration_PO.typeFirstName(firstName) : Registration_PO.touchFirstNameInput();
})

When('I type a last name with {} - Registration', (lastName) => {
    (lastName) ? Registration_PO.typeLastName(lastName) : Registration_PO.touchLastNameInput();
})

When('I type an email with {} - Registration', (email) => {
    (email) ? Registration_PO.typeEmail(email) : Registration_PO.touchEmailInput();
})

When('I type a password with {} - Registration', (password) => {
    (password) ? Registration_PO.typePassword(password) : Registration_PO.touchPasswordInput();
})

When('I type a confirmation password with {} - Registration', (confirmationPassword) => {
    (confirmationPassword) ? Registration_PO.typeConfirmationPassword(confirmationPassword) : Registration_PO.toucheConfirmationPassword();
})

When('I click on submit button - Registration', () => {
    Registration_PO.clickOnSubmitBtn();
})

Then('I am redirect to {} with the message {} and the status code {} - Registration', (urlToRedirect, expectedMessage, statusCode) => {
    cy.url().should('include', urlToRedirect);
    cy.get('body').contains(expectedMessage);
})



// EMAIL EXISTS
When('I type an email with {} - Registration Email Exists', (email) => {
    mockEmailExists()
    Registration_PO.typeEmail(email);
})


const mockEmailExists = (statusCode = 200) => {
    cy.intercept('GET', `/api/auth/checkEmailExists?email=*`, {
        statusCode,
        body: true  
    })
}
 