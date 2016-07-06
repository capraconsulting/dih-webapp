Feature: Complete signup of a new user
    I want to be able to see the form
    And I want feedback if fields are missing information
    And I want to be able to complete sign up

    Scenario: View complete signup page
        Given I open the page "signup.confirm" as "USER"
        Then I expect that element "firstName" is visible
        Then I expect that element "lastName" is visible
        Then I expect that element "dateOfBirth" is visible
        Then I expect that element "email" is visible
        Then I expect that element "password" is visible
        Then I expect that element "passwordConfirmation" is visible

    Scenario: Should not be able to complete signup without entering a password
        Given I open the page "signup.confirm" as "USER"
        And I press key "Enter"
        And I press the button "submit"
        Then I expect that "messages" contains "Can't be blank"

    Scenario: Should not be able to complete signup when password and passwordConfirmation are unequal
        Given I open the page "signup.confirm" as "USER"
        And I set "capra2016" to the inputfield "password"
        And I set "ntnu2017" to the inputfield "passwordConfirmation"
        And I press key "Enter"
        And I press the button "submit"
        Then I expect that "messages" contains "Does not match against password"

    Scenario: Should not be able to complete signup when password is below 8 characters
        Given I open the page "signup.confirm" as "USER"
        And I set "capra" to the inputfield "password"
        And I set "capra" to the inputfield "passwordConfirmation"
        And I press key "Enter"
        And I press the button "submit"
        Then I expect that "messages" contains "Must have at least 8 characters"

    Scenario: Enter password and confirm it then complete signup
        Given I open the page "signup.confirm" as "USER"
        And I set "capra2016" to the inputfield "password"
        And I set "capra2016" to the inputfield "passwordConfirmation"
        And I press key "Enter"
        And I press the button "submit"
