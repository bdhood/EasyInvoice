  
Feature: Invoice

  Scenario: As a user, I can create an invoice
    Given I am on the items screen
    When I click create invoice
    And I click generate
    Then I see text ["Submitted on", "$968.00"]
