Feature: Creating a new destination
    I want to be able to create new destinations
    And I want to be able to store the destinations

    Scenario: Create a new destination
        Given I open the page "new.destination" as "ADMIN"
        Then I expect that element "destinationName" is visible
        When I set "Stavern" to the inputfield "destinationName"
        Then I expect that inputfield "destinationName" contains "Stavern"
        When I press the button "save"
        Then I expect that "destinations" contains "Stavern"

    Scenario: Destinations should persist in the database
        Given I open the page "new.destination" as "ADMIN"
        Then I expect that element "destinationName" is visible
        When I set "Lier" to the inputfield "destinationName"
        Then I expect that inputfield "destinationName" contains "Lier"
        When I press the button "save"
        Then I expect that "destinations" contains "Lier"
        When I refresh the application
        Then I expect that "destinations" contains "Lier"
