const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { default: LoginPO } = require("../page_objects/Login_PO");

const Login_PO = new LoginPO();

Given('I navigate to login page - Login', () => {
    Login_PO.navigateToLoginPage();
})

When('I type an email with {} - Login', (email) => {
    (email) ? Login_PO.typeEmail(email): Login_PO.touchEmailInput()
})

When('I type a password with {} - Login', (password) => {
    Login_PO.typePassword(password)
})

When('I click on submit button - Login', () => {
    mockLoginApi().then(() => {
        Login_PO.clickOnSubmitBtn()
    })
})

When('I click on submit button - Login wrong email or password', () => {
    mockLoginApi(401).then(() => {
        Login_PO.clickOnSubmitBtn()
    })
})

When('I click on submit button - Login error server', () => {
    mockLoginApi(500).then(() => {
        Login_PO.clickOnSubmitBtn()
    })
})

Then('I am redirect to {} with the message {} - Login', (urlToRedirect, expectedMessage) => {
    cy.url().should('include', urlToRedirect);
    cy.get('body').contains(expectedMessage);
})

const mockLoginApi = (statusCode = 200, expectedBody = {}) => {
    return cy.intercept('POST', '/api/auth/login', {
        statusCode,
        body: expectedBody
    })
}