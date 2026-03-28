Feature: JetBrains IDE run configurations

  Scenario: Run configurations are created when a JetBrains IDE is detected
    Given the project is using Cucumber.js
    And a JetBrains IDE is used with the project
    And no JetBrains run configurations exist for the project
    When the project is lifted
    Then run configurations for the primary scripts are created

  Scenario: Run configurations are not created when a JetBrains IDE is not detected
    Given the project is using Cucumber.js
    And no JetBrains run configurations exist for the project
    When the project is lifted
    Then no run configurations are created
