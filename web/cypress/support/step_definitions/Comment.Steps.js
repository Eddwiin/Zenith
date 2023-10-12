const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// Comment
Given('I navigate to detail page - Comment', () => {})
When('I am authenticated - Comment', () => {})


// Add comment
When('I type the comment with {} on the textarea - Add comment', (newComment) => {})

When('I click on the button submit - Add comment', () => {})

Then('I come back to the comments with the message {} - Add comment', (message) => {})


// Update comment
When('I am the author of the comment - Update comment', () => {})

When('I click on the update comment link - Update comment', () => {})

When('I update the comment with {} - Update comment', (updatedComment) => {})

When('I click on the submit - Update comment', () => {})

Then('I come back to the comments with the message {} - Update comment', (message) => {})


// Delete comment
When('I am the author of the comment - Delete comment', () => {})

When('I click on the delete comment link - Delete comment', () => {})

When('I confirm my action in the popup - Delete comment', () => {})

Then('I come back to the comments with the message {} - Delete comment', (message) => {})