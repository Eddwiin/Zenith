const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// List books
Given('I navigate to home page - List books', () => {})

When('I am authenticated - List books', () => {})

Then('I display last books added - List books', () => {})


// Search book
Given('I navigate to home page - Search book', () => {})

When('I type two caracteres on search input', () => {})

When('I am authenticated - Search book', () => {})

Then('I display all books matching with filter - Search book', () => {})

// Redirect to detail page
Given('I navigate to home page - Redirect detail page', () => {})

When('I am authenticated - Redirect detail page', () => {})

When('I click on the book - Redirect detail page', () => {})

Then('I am redirect to detail page - Redirect detail page', () => {})