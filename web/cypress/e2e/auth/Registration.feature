@auth @registration
Feature: Zenith - Registration

    Background: Pre-condition
        Given I navigate to registration page - Registration

    Scenario: When the email exists in database
        When I type a first name with <firstName> - Registration
        And I type a last name with <lastName> - Registration
        And I type an email with <email> - Registration Email Exists
        And I type a password with <password> - Registration
        And I type a confirmation password with <confirmationPassword> - Registration
        And I click on submit button - Registration
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Registration

        Examples:
            | firstName | lastName | email                | password   | confirmationPassword | urlToRedirect | expectedMessage          | statusCode |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | The email already exists | 200        |


    Scenario: When the creation of account return an error server
        When I type a first name with <firstName> - Registration
        And I type a last name with <lastName> - Registration
        And I type an email with <email> - Registration
        And I type a password with <password> - Registration
        And I type a confirmation password with <confirmationPassword> - Registration
        And I click on submit button - Registration Error Server
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Registration

        Examples:
            | firstName | lastName | email                | password   | confirmationPassword | urlToRedirect | expectedMessage                                               | statusCode |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | An unexpected error has occurred! Try again in a few minutes. | 500        |

    Scenario Outline: Successful & Unsucessful registration
        When I type a first name with <firstName> - Registration
        And I type a last name with <lastName> - Registration
        And I type an email with <email> - Registration
        And I type a password with <password> - Registration
        And I type a confirmation password with <confirmationPassword> - Registration
        And I click on submit button - Registration
        Then I am redirect to <urlToRedirect> with the message <expectedMessage> - Registration

        Examples:
            | firstName | lastName | email                | password   | confirmationPassword | urlToRedirect | expectedMessage                                                                                                     | statusCode |
            |           | Doe      | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The first name is mandatory                                                                                         |            |
            | t         | Doe      | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The first name must contains at least two characters                                                                |            |
            | John      |          | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The last name is mandatory                                                                                          |            |
            | John      | D        | john.doe@test.fr     | Azerty123! | Azerty123!           | /registration | The last name must contains at least two characters                                                                 |            |
            | John      | Doe      |                      | Azerty123! | Azerty123!           | /registration | The email is mandatory                                                                                              |            |
            | John      | Doe      | john.doetest.fr      | Azerty123! | Azerty123!           | /registration | The email is not valid                                                                                              |            |
            | John      | Doe      | john.doe@test        | Azerty123! | Azerty123!           | /registration | The email is not valid                                                                                              |            |
            | John      | Doe      | john.doe@test.fr     |            | Azerty123!           | /registration | The password is mandatory                                                                                           |            |
            | John      | Doe      | john.doe@test.fr     | Azerty123! |                      | /registration | The confirmation of password is mandatory                                                                           |            |
            | John      | Doe      | john.doetest@test.fr | Azerty!    | Azerty!              | /registration | The password must contain at least one uppercase letter, one lowercase letter, one number and one special character |            |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty               | /registration | The password must contain at least one uppercase letter, one lowercase letter, one number and one special character |            |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty12323!         | /registration | Passwords are not the same                                                                                          |            |
            | John      | Doe      | john.doetest@test.fr | Azerty123! | Azerty123!           | /registration | The account has been created.                                                                                       | 201        |
