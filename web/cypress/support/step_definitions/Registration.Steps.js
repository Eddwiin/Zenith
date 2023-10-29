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
    mockEmailExists().then(() => {
        (email) ? Registration_PO.typeEmail(email) :  Registration_PO.touchEmailInput();
    })
})

// EMAIL EXISTS
When('I type an email with {} - Registration Email Exists', (email) => {
    mockEmailExists(200, true).then(() => {
        Registration_PO.typeEmail(email);
    })

})

When('I type a password with {} - Registration', (password) => {
    (password) ? Registration_PO.typePassword(password) : Registration_PO.touchPasswordInput();
})

When('I type a confirmation password with {} - Registration', (confirmationPassword) => {
    (confirmationPassword) ? Registration_PO.typeConfirmationPassword(confirmationPassword) : Registration_PO.toucheConfirmationPassword();
})

When('I click on submit button - Registration', () => {
    mockAccountCreated().then(() => {
        Registration_PO.clickOnSubmitBtn();
    })
})

// Error server 
When('I click on submit button - Registration Error Server', () => {
    mockAccountCreated(500, false).then(() => {
        Registration_PO.clickOnSubmitBtn();
    });
})


Then('I am redirect to {} with the message {} - Registration', (urlToRedirect, expectedMessage) => {
    cy.url().should('include', urlToRedirect);
    cy.get('body').contains(expectedMessage);
})

// MOCKS
const mockEmailExists = (statusCode = 200, expectedBody = false) => {
    return cy.intercept('GET', `/api/auth/checkEmailExists?email=*`, {
        statusCode: statusCode,
        body: expectedBody  
    })
}
 

const mockAccountCreated = (statusCode = 200, expectedBody = true) => {
    return cy.intercept('POST', '/api/auth/createAccount', {
        statusCode: statusCode,
        body: expectedBody
    })
}