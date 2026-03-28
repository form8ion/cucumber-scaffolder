Feature: Lift Config

  @wip
  Scenario: Config with leftover `publishQuiet` property
    Given the .codecov.yml file exists in the root of the repository with the following content:
      """
      publishQuiet: true
      """
    When the project is lifted
    Then the config file does not contain the `publishQuiet` property
