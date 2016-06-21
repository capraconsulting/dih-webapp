Feature: Creating a new destination
    I want to be able to create new destinations

    Scenario: Create a new destination
          Given I open the page "new.destination"
          Then I expect that element "name" is visible
          When I set "Stavern" to the inputfield "name"
          Then I expect that inputfield "name" contains "Stavern"
