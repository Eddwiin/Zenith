@home @detailBook
Feature: Zenith - Detail book

    Background: Pre-condition
        Given I navigate to detail page - Detail book
        When I am authenticated - Detail book

    Scenario: Show detail book
        Then I can see information of the book : '<name>', '<description>', '<nbOfPage>', '<category>', '<createdAt>', '<updatedAt>' and '<comments>' - Show detail book

    Scenario: Update detail book
        And I am the author of the post's book - Update detail book
        And I click on update btn - Update detail book
        And I type the name of the book '<name>' in the input text - Update detail book
        And I type the description of the book '<description>' in the textarea - Update detail book
        And I type the number of the page in the book '<nbOfPage>' in the input number - Update detail book
        And I select the category of the book '<category>' - Update detail book
        And I click on the update button - Update detail book
        Then I back to detail page with new informations of book udpated - Update detail book

    Scenario: Delete book
        And I am the author of the post's book - Delete book
        And I click on the delete button - Delete book
        And I click on confirm delete book in the popup - Delete book
        Then I am redirect to list of the books in the home page without the book deleted - Delete book