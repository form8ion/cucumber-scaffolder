Feature: JetBrains IDE run configurations

  Scenario: Run configurations are created when a JetBrains IDE is detected
    Given the project is using Cucumber.js
    And a JetBrains IDE is used with the project
    And no JetBrains run configurations exist for the project
    When the project is lifted
    Then run configurations for the primary scripts are created

  Scenario: Project has a build step
    Given the project is using Cucumber.js
    And a JetBrains IDE is used with the project
    And no JetBrains run configurations exist for the project
    And the project has a build step defined in package.json
    When the project is lifted
    Then run configurations perform the build step before running the tests

  Scenario: Run configurations are not created when a JetBrains IDE is not detected
    Given the project is using Cucumber.js
    And no JetBrains run configurations exist for the project
    When the project is lifted
    Then no run configurations are created

  @wip
  Scenario: Typescript project
