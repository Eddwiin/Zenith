@auth @login
Feature: Zenith - Login

    Scenario Outline: Successful & Unsucessful login
        Given I navigate to login page - Login
        When I type an email with '<email>' - Login
        And I type a password with '<password>' - Login
        And I click on submit button - Login
        Then I am redirect to '<urlToRedirect>' with the message '<message>' - Login

        Examples:
            | email             | password   | urlToRedirect | message                         |
            | johntest.com      | Azerty123! | /login        | Email is invalid                |
            | johntest@test.com | Azerty123! | /login        | Email or password is wrong      |
            | johntest@test.com | Azerty123! | /login        | Something wrong with the server |
            | johntest@test.com | Azerty123! | /home         | Successful connection           |
