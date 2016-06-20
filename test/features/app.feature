Feature: Application test
    I see that the title of the page is correct

    Scenario: Check title
        Given I open the page "/"
        Then  I expect that title is equal to "Dråpen i havet"
