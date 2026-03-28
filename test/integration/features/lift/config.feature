Feature: Lift Config

  @wip
  Scenario: Config with leftover `publishQuiet` property
    Given the project is using Cucumber.js
    And the .codecov.yml file exists in the root of the repository with the following content:
      """
      publishQuiet: true
      """
    When the project is lifted
    Then the config file does not contain the `publishQuiet` property
