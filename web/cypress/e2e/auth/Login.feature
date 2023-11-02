@auth @login
Feature: Zenith - Login

    Scenario: When is wrong email or password
        Given I navigate to login page - Login
        When I type an email with <email> - Login
        And I type a password with <password> - Login
        And I click on submit button - Login wrong email or password
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Login

        Examples:
            | email             | password   | urlToRedirect | expectedMessage                    |
            | johntest@test.com | Azerty123! | /login        | The email and/or password is wrong |


    Scenario: When the server return an error
        Given I navigate to login page - Login
        When I type an email with <email> - Login
        And I type a password with <password> - Login
        And I click on submit button - Login error server
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Login

        Examples:
            | email             | password   | urlToRedirect | expectedMessage                                               |
            | johntest@test.com | Azerty123! | /login        | An unexpected error has occurred! Try again in a few minutes. |

    Scenario Outline: Successful & Unsucessful login
        Given I navigate to login page - Login
        When I type an email with <email> - Login
        And I type a password with <password> - Login
        And I click on submit button - Login
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Login

        Examples:
            | email             | password   | urlToRedirect | expectedMessage        |
            |                   | Azerty123! | /login        | The email is mandatory |
            | johngamil.com     | Azerty123! | /login        | The email is invalid   |
            | johntest@test.com | Azerty123! | /home         | Successful connection  |
