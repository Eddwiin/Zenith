const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// Logout
Given('I navigate to home page - Logout Button', () => {})

When('I am authenticated - Logout Button', () => {})

When('I click on logout button - Logout Button', () => {})

Then('I am redirect to <urlToRedirect> with <message>- Logout Button', (urlToRedirect, message) => {})


// Notification button
Given('I navigate to home page - Notification button', () => {})

When('I am authenticated - Notification button', () => {})

When('I have new notification - Notification button', () => {})

Then('I should have notification with notification(s) - Notification button', () => {})


// Notification message
Given('I navigate to home page - Notification Messages', () => {})

When('I am authenticated - Notification Messages', () => {})

When('I click on notification button - Notification Messages', () => {})

Then('I should display last five notifications - Notification Messages', () => {})