const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to login page', () => {})

When('I type an email to log in with {}', (email) => {})

When('I type a password to log in with {}', (password) => {})

Then('I am redirect to {} with the message {}', (urlToRedirect, message) => {})