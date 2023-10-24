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
    mockAccountCreated()
    Registration_PO.clickOnSubmitBtn();
})

Then('I am redirect to {} with the message {} - Registration', (urlToRedirect, expectedMessage) => {
    cy.url().should('include', urlToRedirect);
    cy.get('body').contains(expectedMessage);
})


// EMAIL EXISTS
When('I type an email with {} - Registration Email Exists', (email) => {
    mockEmailExists()
    cy.wait(200);
    Registration_PO.typeEmail(email);
})


// Error server 
When('I click on submit button - Registration Error Server', () => {
    mockAccountCreated(500, false);
    
    Registration_PO.clickOnSubmitBtn();
})

// MOCKS
const mockEmailExists = () => {
    cy.intercept('GET', `/api/auth/checkEmailExists?email=*`, {
        statusCode: 200,
        body: true  
    }).as('mockEmailExists', { timeout: 10000 })
}
 

const mockAccountCreated = (statusCode = 200, body = true) => {
    cy.intercept('POST', '/api/auth/createAccount', {
        statusCode,
        body
    })
}