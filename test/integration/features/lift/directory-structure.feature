Feature: directory structure

  Scenario: step_definitions has only a .gitkeep file
    Given the project is using Cucumber.js
    And a .gitkeep file exists in the step_definitions directory
    When the project is lifted
    Then the step_definitions directory should only contain a .gitkeep file

  Scenario: step_definitions has a .gitkeep file and other files
    Given the project is using Cucumber.js
    And a .gitkeep file exists in the step_definitions directory
    And other files exist in the step_definitions directory
    When the project is lifted
    Then the step_definitions directory should not contain a .gitkeep file
    And the other files should remain in the step_definitions directory

  Scenario: step_definitions does not have a .gitkeep file but has other files
    Given the project is using Cucumber.js
    And other files exist in the step_definitions directory
    When the project is lifted
    Then the step_definitions directory should not contain a .gitkeep file
    And the other files should remain in the step_definitions directory
