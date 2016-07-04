
Feature: Login
    I want to be able to see the form

    Scenario: Open login page
        Given I open the page "login"
        Then I expect that element "email" is visible
        Then I expect that element "password" is visible
