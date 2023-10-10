const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to reset password - Reset password', () => {})

When('I type a password with {} - Reset password', (password) => {})

When('I type a confirmation password with {} - Reset password', (confirmationPassword) => {})

When('I click on submit button - Reset password', () => {})

Then('I am redirect to {} with the message {} - Reset password', (urlToRedirect, message) => {})