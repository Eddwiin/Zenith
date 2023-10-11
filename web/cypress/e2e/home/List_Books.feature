@home @listBooks
Feature: Zenith - List books

    Scenario: List all books added
        Given I navigate to home page - List books
        And I am authenticated - List books
        Then I display last books added - List books

    Scenario: Search book
        Given I navigate to home page - Search book
        And I am authenticated - Search book
        And I type two caracteres on search input
        Then I display all books matching with filter - Search book

    Scenario: Redirect to detail page
        Given I navigate to home page - Redirect detail page
        And I am authenticated - Redirect detail page
        And I click on the book - Redirect detail page
        Then I am redirect to detail page - Redirect detail page