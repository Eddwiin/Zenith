@home @listBooks
Feature: Zenith - List books

    Background: Pre-condition
        Given I navigate to home page - List books
        When I am authenticated - List books

    Scenario: List all books added
        Then I display last books added - List books

    Scenario: Search book
        And I type two caracteres on search input
        Then I display all books matching with filter - Search book

    Scenario: Add new book
        And I click on the add new book button - Add new book
        And I wait for 1 second until the modal open - Add new book
        And I type the name of the book '<name>' in the input text - Add new book
        And I type the description of the book '<description>' in the textarea - Add new book
        And I type the number of the page in the book '<nbOfPage>' in the input number - Add new book
        And I select the category of the book '<category>' - Add new book
        And I click on the submit button - Add new book
        Then I back to home page with my new book added on the top of the list - Add new book


    Scenario: Redirect to detail page
        And I click on the book - Redirect detail page
        Then I am redirect to detail page - Redirect detail page