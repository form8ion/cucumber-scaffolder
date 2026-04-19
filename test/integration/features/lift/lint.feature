Feature: Replace gherkin-lint with gplint

  Scenario: gherkin-lint is used in the project
    Given the project is using Cucumber.js
    And gherkin-lint is used in the project
    When the project is lifted
    Then gplint is configured
    And the lint script is defined
    And gherkin-lint is removed from the project

  Scenario: gherkin-lint is used in the project with extensionless config
    Given the project is using Cucumber.js
    And gherkin-lint is used in the project with extensionless config
    When the project is lifted
    Then gplint is configured
    And the lint script is defined
    And gherkin-lint is removed from the project
