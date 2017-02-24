Feature: Happy HTML form works
  In order to review the Form loaded
  As a user
  Wants to verify the /start loads a html content

  Scenario: User needs to see the HTML form loaded
    When main application page is loaded
    Then user redirects to start
    And the output should contain HTML form
    
  Scenario: User needs to see text send
    Given Start page is opened
    And User fills the field
    When User presses Enviar Texto button
    Then Text should be displayed