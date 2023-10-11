const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to home page - List books', () => {})
When('I am authenticated - List books', () => {})



// List books
Then('I display last books added - List books', () => {})



// Search book
When('I type two caracteres on search input', () => {})

Then('I display all books matching with filter - Search book', () => {})



// Add new book
When('I click on the add new book button - Add new book', () => {})

When('I wait for {int} second until the modal open - Add new book', (seconds) => {
    cy.wait(seconds)
})

When('I type the name of the book {} in the input text - Add new book', (name) => {})

When('I type the description of the book {} in the textarea - Add new book', (description) => {})

When('I type the number of the page in the book {} in the input number - Add new book', (nbOfPage) => {})

When('I select the category of the book {} - Add new book', (category) => {})

When('I click on the submit button - Add new book', (category) => {})

When('I back to home page with my new book added on the top of the list - Add new book', (category) => {})



// Redirect to detail page
When('I click on the book - Redirect detail page', () => {})

Then('I am redirect to detail page - Redirect detail page', () => {})

