const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");
 
Given('I navigate to detail page - Detail book', () => { })

When('I am authenticated - Detail book', () => {})



// show detail book
Then('I can see information of the book : '<name>', '<description>', '<nbOfPage>', '<category>', '<createdAt>', '<updatedAt>' and '<comments>' - Show detail book',
    (name, description, nbOfPage, category, createdAt, updatedAt, comments ) => {})


// Update book
When('I am the author of the post\'s book - Update detail book', () => {})

When('I click on update btn - Update detail book', () => {})

When('I type the name of the book {} in the input text - Update detail book', (name) => {})

When('I type the description of the book {} in the textarea - Update detail book', (description) => {})

When('I type the number of the page in the book {} in the input number - Update detail book', (nbOfPage) => {})

When('I select the category of the book {} - Update detail book', (category) => {})

When('I click on the update button - Update detail book', (category) => {})

Then('I back to detail page with new informations of book udpated - Update detail book', () => {})


// Delete book
When('I am the author of the post\'s book - Delete book', () => {})

When('I click on the delete button - Delete book', () => {})

When('I click on confirm delete book in the popup - Delete book', () => {})

When('I am redirect to list of the books in the home page without the book deleted - Delete book', () => {})