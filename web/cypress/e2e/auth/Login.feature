@auth @login
Feature: Zenith - Login

    Scenario Outline: Successful & Unsucessful login
        Given I navigate to login page
        And I type an email to log in with <email>
        And I type a password to log in with <password>
        Then I am redirect to <urlToRedirect> with the message <message>

        Examples:
            | email             | password   | urlToRedirect | message                    |
            | johntest.com      | Azerty123! | /login        | Email is invalid           |
            | johntest@test.com | Azerty123! | /login        | Email or password is wrong |
            | johntest@test.com | Azerty123! | /home         | Successful connection      |
