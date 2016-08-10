
Feature: Login
    I want to be able to see the form
    And I want generic feedback when credentials are missing
	And I want generic feedback when credentials are wrong
	And I want to be able to login with correct credentials

    Scenario: Open login page
        Given I open the page "login"
        Then I expect that element "email" is visible
        And I expect that element "password" is visible

    Scenario: Unsuccessful login with blank input
        Given I open the page "login"
        When I press the button "submit"
        Then I expect that "messages" contains "Authentication requires both email and password"

    Scenario: Unsuccessful login with invalid credentials
        Given I open the page "login"
        When I set "test@test.com" to the inputfield "email"
        And I set "wrongpassword" to the inputfield "password"
        And I press the button "submit"
        Then I expect that "messages" contains "Invalid credentials provided"

    Scenario: Login succeeds with valid credentials
        Given I open the page "login"
        When I set "test@test.com" to the inputfield "email"
        And I set "password" to the inputfield "password"
        And I press the button "submit"
