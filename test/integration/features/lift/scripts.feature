Feature: Lift Scripts

  Scenario: project with build step
    Given the project is using Cucumber.js
    And the project has a build step defined in package.json
    When the project is lifted
    Then a script is defined to run the build step before running the integration tests
