@home @navbar
Feature: Zenith - Navbar

    Scenario Outline: Display logout button
        Given I navigate to home page - Logout Button
        And I am authenticated - Logout Button
        And I click on logout button - Logout Button
        Then I am redirect to <urlToRedirect> with <message> - Logout Button

        Examples:
            | urlToRedirect | message                               |
            | /home         | Error Server                          |
            | /login        | you have been successfully logged out |

    Scenario: Display notification button
        Given I navigate to home page - Notification button
        And I am authenticated - Notification button
        And I have new notification - Notification button
        Then I should have notification with <number> notifications - Notification Button

    Scenario: Display notification messages
        Given I navigate to home page - Notification Messages
        And I am authenticated - Notification Messages
        And I click on notification button - Notification Messages
        Then I should display <notificationMessage> notifications - Notification Messages

        Examples:
            | notificationMessage    |
            | last five notification |
            | any notification       |
