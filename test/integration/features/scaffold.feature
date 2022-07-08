Feature: Scaffold

  Scenario: common-js project
    When the project is scaffolded
    Then the npm scripts are defined
    And gherkin-lint is configured

  Scenario: esm project
    When the project is scaffolded
    Then the npm scripts are defined
    And gherkin-lint is configured
