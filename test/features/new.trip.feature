Feature: Sign up for a trip
    I want to be able to select a destination for a trip
    And I want to be able to set a wished start date for a trip
    And I want to be able to set a wished end date for a trip
    And I want to be able to submit the trip form


    Scenario: Select destination for trip
        Given I open the page "new.trip"
        When I click the select "destinationsDropdown"
        Then I expect that selectfield "destinationsSelect" contains "Destinations"
            And I expect that selectfield "destinationsSelect" contains "Stavern"
            And I expect that selectfield "destinationsSelect" contains "Lier"
        When I click the option "Stavern" in selectfield "destinationsSelect"
        Then I expect that option "Stavern" is selected in selectfield "destinationsSelect"

    Scenario: Set wished start date for a trip
        Then I expect that element "wishStartDate" is visible
        When I set "2016-08-06" to the datefield "wishStartDate"
        Then I expect that inputfield "wishStartDate" contains "2016-08-06"

    Scenario: Set wished end date for a trip
        Then I expect that element "wishEndDate" is visible
        When I set "2016-08-09" to the datefield "wishEndDate"
        Then I expect that inputfield "wishEndDate" contains "2016-08-09"

    Scenario: Submit trip form
        When I submit the "tripForm"
        Then I expect that inputfield "wishEndDate" contains "2016-08-09"
