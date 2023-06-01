Feature: Zenith - Sign up

    Scenario: Successful & Unsucessful sign up
        Given I navigate to the sign up page
        And I type a first name with <firstName>
        And I type a last name with <lastName>
        And I type an email with <email>
        And I type a password with <password>
        And I confirm the password with <confirmPassword>
        And I click to the sign up button
        Then I should be display a message with <expectedMessage>

        Examples:
            | firstName | lastName | email            | password   | confirmPassword | expectedMessage |
            | John      | Doe      | john.doe@test.fr | Azerty123! | Azerty123!      | Account created |