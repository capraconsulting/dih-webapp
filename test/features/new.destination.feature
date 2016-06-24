Feature: Creating a new destination
    I want to be able to create new destinations
    And I want to be able to store the destinations

    Scenario: Create a new destination
        Given I open the page "new.destination"
        Then I expect that element "name" is visible
        When I set "Stavern" to the inputfield "name"
        Then I expect that inputfield "name" contains "Stavern"
        When I press the button "save"
        Then I expect that "destinations" contains "Stavern"

    Scenario: Destinations should presist in the database
        Given I open the page "new.destination"
        Then I expect that element "name" is visible
        When I set "Lier" to the inputfield "name"
        Then I expect that inputfield "name" contains "Lier"
        When I press the button "save"
        Then I expect that "destinations" contains "Lier"
        When I refresh the application
        Then I expect that "destinations" contains "Lier"
