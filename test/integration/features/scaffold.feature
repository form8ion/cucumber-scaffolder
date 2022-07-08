Feature: Scaffold

  @wip
  Scenario: common-js project
    When the project is scaffolded
    Then the npm scripts are defined
    And gherkin-lint is configured
    And the cucumber config is written to an "mjs" file

  Scenario: esm project
    When the project is scaffolded
    Then the npm scripts are defined
    And gherkin-lint is configured
    And the cucumber config is written to a "js" file
