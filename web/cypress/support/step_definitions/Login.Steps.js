const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to login page - Login', () => {})

When('I type an email with {} - Login', (email) => {})

When('I type a password with {} - Login', (password) => {})

When('I click on submit button - Login', () => {})

Then('I am redirect to {} with the message {} - Login', (urlToRedirect, message) => {})