Feature: View a destination
    I want to be able to view a destination
    And I want to be able to look at trips to that destination
    And I want to be able to filter trips on status

    Scenario: View trips
        Given I open the page "destination"
        Then I expect that element "destinationInfo" is visible
        Then I expect that element "tripsTable" is visible

    Scenario: Filter trips on status "ACTIVE"

    Scenario: Filter trips on status "PENDING"

    Scenario: Filter trips on status "ACCEPTED"

    Scenario: Filter trips on status "REJECTED"

    Scenario: Filter trips on status "CLOSED"
