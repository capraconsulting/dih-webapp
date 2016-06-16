Feature: Application test
    I want to check that the application functions
    And see that the title of the page is correct

    Scenario: Open the application
        Given I open the page "/"
        Then  I expect that element ".hello-capra" does exist
        And  I expect that element ".goodbye-capra" does not exist

    Scenario: Check title
        Given I open the page "/"
        Then  I expect that title is equal to "Dråpen i havet"
