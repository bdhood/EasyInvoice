  
Feature: Login

  Scenario: As a user, I can login
    Given I am on the login screen
    When I enter email "test@test.com"
    And I enter password "pass"
    And I click login
    Then I see text ["Welcome, Test"]

  Scenario: As a user, I cannot login with an invalid password
    Given I am on the login screen
    When I enter email "test@test.com"
    And I enter password "invalid"
    And I click login
    Then I see alert "Invalid username/password"

  Scenario: As a user, I can logout
    Given I am on the login screen
    When I enter email "test@test.com"
    And I enter password "pass"
    And I click login
    And I click logout
    Then I see text ["Login"]
    And I do not see text ["Welcome, Test"]