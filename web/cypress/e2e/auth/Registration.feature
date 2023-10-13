@auth @registration
Feature: Zenith - Registration

    Scenario Outline: Successful & Unsucessful registration
        Given I navigate to registration page - Registration
        When I type a first name with '<firstName>' - Registration
        And I type a last name with '<lastName>' - Registration
        And I type an email with '<email>' - Registration
        And I type a password with '<password>' - Registration
        And I type a confirmation password with '<confirmationPassword>' - Registration
        And I click on submit button - Registration
        Then I am redirect to '<urlToRedirect>' with the message '<message>' - Registration

        Examples:
            | firstName | lastName | email                | password  | confirmationPassword | urlToRedirect | message                                        |
            |           | Doe      | john.doe@test.fr     | Azerty123 | Azerty123            | /registration | First name is required                         |
            | t         | Doe      | john.doe@test.fr     | Azerty123 | Azerty123            | /registration | First name must contains 2 characters minimum  |
            | John      |          | john.doe@test.fr     | Azerty123 | Azerty123            | /registration | Last name is required                          |
            | John      | Doe      |                      | Azerty123 | Azerty123            | /registration | Email is required                              |
            | John      | Doe      | john.doetest.fr      | Azerty123 | Azerty123            | /registration | Email format is invalid                        |
            | John      | Doe      | john.doe@test        | Azerty123 | Azerty123            | /registration | Email format is invalid                        |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123            | /registration | Email exists                                   |
            | John      | Doe      | john.doe@test.fr     |           | Azerty123            | /registration | Password is required                           |
            | John      | Doe      | john.doe@test.fr     | Azerty123 |                      | /registration | Confirmation password is required              |
            | J         | Doe      | john.doe@test.fr     | Azerty123 | Azerty123            | /registration | First name must contain more than one letter   |
            | John      | D        | john.doe@test.fr     | Azerty123 | Azerty123            | /registration | Last name must contain more than one letter    |
            | John      | Doe      | john.doetest@test.fr | Azerty!   | Azerty!              | /registration | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty               | /registration | Password is invalid                            |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty12323          | /registration | Password and confirm password are not the same |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123            | /registration | Something wrong with the server                |
            | John      | Doe      | john.doetest@test.fr | Azerty123 | Azerty123            | /registration | Account created                                |
