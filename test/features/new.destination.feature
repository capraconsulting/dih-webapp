Feature: Creating a new destination
    I want to be able to create new destinations

    Scenario: Create a new destination
          Given I open the page "new.destination"
          Then I expect that element "name"
          When I enter "Lier" in field "name"
          When I submit the form
