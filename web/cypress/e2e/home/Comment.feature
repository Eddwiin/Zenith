Feature: Zenith - Comment detail book

    Background: Pre-condition
        Given I navigate to detail page - Comment
        When I am authenticated - Comment

    Scenario Outline: Add comment
        And I type the comment with '<newComment>' on the textarea - Add comment
        And I click on the button submit - Add comment
        Then I come back to the comments with the message '<message>' - Add comment

        Examples:
            | newComment | message                             |
            |            | You can't update with empty comment |
            | test       | Comment added successfully          |


    Scenario Outline: Update comment
        And I am the author of the comment - Update comment
        And I click on the update comment link - Update comment
        And I update the comment with '<updatedComment>' - Update comment
        And I click on the submit - Update comment
        Then I come back to the comments with the message '<message>' - Update comment

        Examples:
            | updatedComment | message                             |
            |                | You can't update with empty comment |
            | test           | Comment added successfully          |

    Scenario Outline: Delete comment
        And I am the author of the comment - Delete comment
        And I click on the delete comment link - Delete comment
        And I confirm my action in the popup - Delete comment
        Then I come back to the comments with the message '<message>' - Delete comment

        Examples:
            | message                         |
            | Something wrong with the server |
            | Comment deleted successfully    |
