@auth @registration
Feature: Zenith - Registration

    Scenario Outline: Successful & Unsucessful registration
        Given I navigate to registration page - Registration
        And I type a first name with <firstName> - Registration
        And I type a last name with <lastName> - Registration
        And I type an email with <email> - Registration
        And I type a password with <password> - Registration
        And I type a confirmation password with <confirmationPassword> - Registration
        And I click on submit button - Registration
        Then I should display a message with <expectedMessage> - Registration

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
