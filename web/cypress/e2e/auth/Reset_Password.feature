@auth @resetPassword
Feature: Zenith - Reset password

    Scenario Outline: Successful & Unsucessful forgot password
        Given I navigate to reset password - Reset password
        And I type a password with <password> - Reset password
        And I type a confirmation password with <confirmationPassword> - Reset password
        And I click on submit button - Reset password
        And I am redirect to <urlToRedirect> with the message <message> - Reset password

        Examples:
            | password   | confirmationPassword | urlToRedirect   | message                   |
            | Azerty     | Azerty               | /reset-password | Password is invalid       |
            | Azerty12   | Azerty               | /reset-password | Passwords is not the same |
            | Azerty123! | Azerty123!           | /reset-password | Token is invalid          |
            | Azerty123! | Azerty123!           | /reset-password | Error Server              |
            | Azerty123! | Azerty123!           | /login          | Password has been updated |
