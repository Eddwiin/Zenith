@home @detailBook
Feature: Zenith - Detail book

    Background: Pre-condition
        Given I navigate to detail page - Detail book
        When I am authenticated - Detail book

    Scenario: Show detail book
        Then I can see information of the book : '<name>', '<description>', '<nbOfPage>', '<category>', '<createdAt>', '<updatedAt>' and '<comments>' - Show detail book

    Scenario Outline: Update detail book
        And I am the author of the post's book - Update detail book
        And I click on update btn - Update detail book
        And I type the name of the book '<name>' in the input text - Update detail book
        And I type the description of the book '<description>' in the textarea - Update detail book
        And I type the number of the page in the book '<nbOfPage>' in the input number - Update detail book
        And I select the category of the book '<category>' - Update detail book
        And I click on the update button - Update detail book
        Then I see the message '<message>' - Update detail book

        Examples:
            | name | description | nbOfPage | category | message                            |
            |      | test        | 125      | roman    | Name is invalid                    |
            | test |             | 125      | roman    | Description is invalid             |
            | test | test        |          | roman    | NbofPage is invalid                |
            | test | test        | 125      |          | Category is invalid                |
            | test | test        | 125      | roman    | Book has been updated with success |

    Scenario Outline: Delete book
        And I am the author of the post's book - Delete book
        And I click on the delete button - Delete book
        And I click on confirm delete book in the popup - Delete book
        Then I am redirect to list of the books in the home page with the message '<message>' - Delete book

        Examples:
            | message                         |
            | Something wrong with the server |
            | Comment deleted successfully    |