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
            | firstName | lastName | email                | password  | confirmPassword | expectedMessage                                |
            # | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123      | Account created                                |
            |           | Doe      | john.doe@test.fr     | Azerty123 | Azerty123       | First name is required                         |
            | John      |          | john.doe@test.fr     | Azerty123 | Azerty123       | Last name is required                          |
            | John      | Doe      |                      | Azerty123 | Azerty123       | Email is required                              |
            | John      | Doe      | john.doe@test.fr     |           | Azerty123       | Password is required                           |
            | John      | Doe      | john.doe@test.fr     | Azerty123 |                 | Confirmation password is required              |
            | J         | Doe      | john.doe@test.fr     | Azerty123 | Azerty123       | First name must contain more than one letter   |
            | John      | D        | john.doe@test.fr     | Azerty123 | Azerty123       | Last name must contain more than one letter    |
            | John      | Doe      | john.doetest.fr      | Azerty123 | Azerty123       | Email is invalid                               |
            | John      | Doe      | john.doetest@test    | Azerty123 | Azerty123       | Email is invalid                               |
            | John      | Doe      | john.doetest@test.fr | Azerty!   | Azerty!         | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty          | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty12323     | Password and confirm password are not the same |
