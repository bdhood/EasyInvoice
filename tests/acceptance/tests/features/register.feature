  
Feature: Register

  Scenario: As a user, I can register
    Given I am on the register screen
    When I enter name "Test Account 2"
    And I enter the randomized email
    And I enter phone number "9492351938"
    And I enter billing address "21371 Garden Ave{enter}Hayward, CA{enter}94541"
    And I enter company name "Lockheed Martin"
    And I enter company address "Lockheed Martin (ATC){enter}Palo Alto, CA{enter}(650) 424-2000"
    And I enter password "password123$"
    And I click create
    And I enter the randomized email
    And I enter password "password123$"
    And I click login
    Then I see text ["Welcome, Test"]
