@auth @registration
Feature: Zenith - Registration

    Scenario Outline: Successful & Unsucessful registration
        Given I navigate to registration page - Registration
        When I type a first name with <firstName> - Registration
        And I type a last name with <lastName> - Registration
        And I type an email with <email> - Registration
        And I type a password with <password> - Registration
        And I type a confirmation password with <confirmationPassword> - Registration
        And I click on submit button - Registration
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Registration

        Examples:
            | firstName | lastName | email                | password   | confirmationPassword | urlToRedirect | expectedMessage                                                                                                     |
            |           | Doe      | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The first name is mandatory                                                                                         |
            | t         | Doe      | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The first name must contains at least two characters                                                                |
            | John      |          | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The last name is mandatory                                                                                          |
            | John      | D        | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The last name must contains at least two characters                                                                 |
            | John      | Doe      |                      | Azerty123! | Azerty123!           | /registration | The email is mandatory                                                                                              |
            | John      | Doe      | john.doetest.fr      | Azerty123! | Azerty123!           | /registration | The email is not valid                                                                                              |
            | John      | Doe      | john.doe@test        | Azerty123! | Azerty123!           | /registration | The email is not valid                                                                                              |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | The email already exists                                                                                            |
            | John      | Doe      | john.doe@test.fr     |            | Azerty123!           | /registration | The password is mandatory                                                                                           |
            | John      | Doe      | john.doe@test.fr     | Azerty123! |                      | /registration | The confirmation of password is mandatory                                                                           |
            | John      | Doe      | john.doetest@test.fr | Azerty!    | Azerty!              | /registration | The password must contain at least one uppercase letter, one lowercase letter, one number and one special character |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty               | /registration | The password must contain at least one uppercase letter, one lowercase letter, one number and one special character |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty12323!         | /registration | Passwords are not the same                                                                                          |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | Something wrong with the server                                                                                     |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | Account created                                                                                                     |
