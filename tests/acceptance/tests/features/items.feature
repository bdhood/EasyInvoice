  
Feature: Items

  Scenario: As a user, I can add an item
    Given I am on the items screen
    When I click add expense
    And I enter description "A hard days work"
    And I enter quanity "8"
    And I enter rate "45"
    And I click Add
    Then I see text ["A hard days work", "8", "45"]

  Scenario: As a user, I can remove an item
    Given I am on the items screen
    When I toggle the top checkbox
    When I click remove
    Then I do not see text ["A hard days work"]