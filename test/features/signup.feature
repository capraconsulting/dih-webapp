Feature: Signup new user
    I want to be able to see the form
	And I want feedback if fields are missing information
	And I want to be able to sign up
	And I should not be able to sign up with the same email

    Scenario: Open signup page
        Given I open the page "signup"
		Then I expect that element "firstname" is visible
		Then I expect that element "lastname" is visible
		Then I expect that element "birth" is visible
		Then I expect that element "email" is visible

	Scenario: Form validation
		Given I open the page "signup"
		When I press the button "submit"
		Then I expect that "messages" contains "First name can't be blank"
		And I expect that "messages" contains "Last name can't be blank"
		And I expect that "messages" contains "E-mail name can't be blank"
		And I expect that "messages" contains "Date of birth name can't be blank"

	Scenario: Sign up
		Given I open the page "signup"
		When I set "Firstname" to the inputfield "firstname"
		And I set "Lastname" to the inputfield "lastname"
		And I set "firstname@lastname.coom" to the inputfield "email"
		And I set "17/10/1990" to the inputfield "birth"
		And I press key "Enter"
		And I press the button "submit"

	Scenario: Sign up
		Given I open the page "signup"
		When I set "Firstname" to the inputfield "firstname"
		And I set "Lastname" to the inputfield "lastname"
		And I set "firstname@lastname.coom" to the inputfield "email"
		And I set "17/10/1990" to the inputfield "birth"
		And I press key "Enter"
		And I press the button "submit"
		Then I expect that "messages" contains "email must be unique"
