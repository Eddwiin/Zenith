@auth @signUp
Feature: Zenith - Sign Up

    Scenario Outline: Successful & Unsucessful sign up
        Given I navigate to sign up page
        And I type a first name with <firstName>
        And I type a last name with <lastName>
        And I type an email with <email>
        And I type a password with <password>
        And I type a confirmation password with <confirmationPassword>
        Then I should display a message with <expectedMessage>

        Examples:
            | firstName | lastName | email                | password  | confirmationPassword | expectedMessage                                |
            |           | Doe      | john.doe@test.fr     | Azerty123 | Azerty123            | First name is required                         |
            | John      |          | john.doe@test.fr     | Azerty123 | Azerty123            | Last name is required                          |
            | John      | Doe      |                      | Azerty123 | Azerty123            | Email is required                              |
            | John      | Doe      | john.doe@test.fr     |           | Azerty123            | Password is required                           |
            | John      | Doe      | john.doe@test.fr     | Azerty123 |                      | Confirmation password is required              |
            | J         | Doe      | john.doe@test.fr     | Azerty123 | Azerty123            | First name must contain more than one letter   |
            | John      | D        | john.doe@test.fr     | Azerty123 | Azerty123            | Last name must contain more than one letter    |
            | John      | Doe      | john.doetest.fr      | Azerty123 | Azerty123            | Email is invalid                               |
            | John      | Doe      | john.doetest@test    | Azerty123 | Azerty123            | Email is invalid                               |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123            | Email exists                                   |
            | John      | Doe      | john.doetest@test.fr | Azerty!   | Azerty!              | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty               | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty12323          | Password and confirm password are not the same |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123            | Account created                                |
