@home @listBooks
Feature: Zenith - List books

    Background: Pre-condition
        Given I navigate to home page - List books
        When I am authenticated - List books

    Scenario: List all books added
        Then I display last books added - List books

    Scenario: Search book
        And I type two caracteres '<searchText>' on search input
        Then I display all books '<booksFound>' matching with filter - Search book

        Examples:
            | searchText | booksFound                                                                   |
            | Sherl      | Sherlock Holmes - Une étude en rouge, Sherlock Holmes - la vallée de la peur |
            | oby        | Herman Melville - Moby Dick                                                  |
            | Dra cu     | Bram Stoker - Dracula                                                        |

    Scenario Outline: Add new book
        And I click on the add new book button - Add new book
        And I wait for 1 second until the modal open - Add new book
        And I type the name of the book '<name>' in the input text - Add new book
        And I type the description of the book '<description>' in the textarea - Add new book
        And I type the number of the page in the book '<nbOfPage>' in the input number - Add new book
        And I select the category of the book '<category>' - Add new book
        And I click on the submit button - Add new book
        Then I see the message '<message>' - Add new book

        Examples:
            | name | description | nbOfPage | category | message                            |
            |      | test        | 125      | roman    | Name is invalid                    |
            | test |             | 125      | roman    | Description is invalid             |
            | test | test        |          | roman    | NbofPage is invalid                |
            | test | test        | 125      |          | Category is invalid                |
            | test | test        | 125      | roman    | Book has been created with success |

    Scenario: Navigate to detail page
        And I click on the book - Navigate to detail page
        Then I am redirect to detail page - Navigate to detail page