@auth @forgotPassword
Feature: Zenith - Forgot Password

    Scenario Outline: Successful & Unsucessful forgot password
        Given I navigate to forgot password page - Forgot Password
        And I type a email with <email> - Forgot Password
        And I click on submit button - Forgot password
        Then I am redirect to <urlToRedirect> with the message <message> - Forgot Password

        Examples:

            | email             | urlToRedirect    | message             |
            | johntest@test     | /forgot-password | Email is invalid    |
            | johntest@test.com | /forgot-password | Email doesn't exist |
            | johntest@test.com | /forgot-password | Error Server        |
            | johntest@test.com | /login           | Reset email sent    |