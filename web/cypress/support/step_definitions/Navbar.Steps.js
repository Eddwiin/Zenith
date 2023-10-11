const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to home page - Navbar', () => {})

When('I am authenticated - Navbar', () => {})

// Logout
When('I click on logout button - Logout Button', () => {})

Then('I am redirect to {} with {} - Logout Button', (urlToRedirect, message) => {})


// Notification button
When('I have new notification - Notification button', () => {})

Then('I should have notification with {} notifications - Notification Button', (number) => {})


// Notification message
When('I click on notification button - Notification Messages', () => {})

Then('I should display {} notifications - Notification Messages', (notificationMessage) => {})