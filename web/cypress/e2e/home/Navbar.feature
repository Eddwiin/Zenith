@home @navbar
Feature: Zenith - Navbar

    Background: Pre-condition
        Given I navigate to home page - Navbar
        When I am authenticated - Navbar

    Scenario Outline: Display logout button
        And I click on logout button - Logout Button
        Then I am redirect to '<urlToRedirect>' with '<message>' - Logout Button

        Examples:
            | urlToRedirect | message                               |
            | /home         | Error Server                          |
            | /login        | you have been successfully logged out |

    Scenario: Display notification button
        And I have new notification - Notification button
        Then I should have notification with '<number>' notifications - Notification Button

    Scenario: Display notification messages
        And I click on notification button - Notification Messages
        Then I should display '<notificationMessage>' notifications - Notification Messages

        Examples:
            | notificationMessage    |
            | last five notification |
            | any notification       |
