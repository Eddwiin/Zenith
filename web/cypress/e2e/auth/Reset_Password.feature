@auth @resetPassword
Feature: Zenith - Reset password

    Scenario Outline: Successful & Unsucessful forgot password
        Given I navigate to reset password - Reset password
        When I type a password with '<password>' - Reset password
        And I type a confirmation password with '<confirmationPassword>' - Reset password
        And I click on submit button - Reset password
        Then I am redirect to '<urlToRedirect>' with the message '<message>' - Reset password

        Examples:
            | password   | confirmationPassword | urlToRedirect   | message                         |
            | Azerty     | Azerty               | /reset-password | Password is invalid             |
            | Azerty12   | Azerty               | /reset-password | Passwords is not the same       |
            | Azerty123! | Azerty123!           | /reset-password | Token is invalid                |
            | Azerty123! | Azerty123!           | /reset-password | Something wrong with the server |
            | Azerty123! | Azerty123!           | /login          | Password has been updated       |
