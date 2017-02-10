Feature: Currency exchange buy sell

  Scenario: Add new start amount
    When I browse to the "/"
    When I enter "100" into "cantor.windowForStartValue" field
    And I click "cantor.acceptStartValue"
    Then I should see "100.00" in "cantor.valuePln"

  Scenario: When I bay currency foreign
    When I enter "1000" into "cantor.windowForStartValue" field
    And I click "cantor.acceptStartValue"
    Then I should see "1,000.00" in "cantor.valuePln"
    When I enter "200" into "cantor.windowForBay" field
    And I click "cantor.buttonForBay"
    Then  I should see "200" in "cantor.valueUsd"

  Scenario: When I buy value and is alert
    When I enter "1001" into "cantor.windowForStartValue" field
    And I click "cantor.acceptStartValue"
    Then I should see "1,001.00" in "cantor.valuePln"
    When I enter "1000" into "cantor.windowForBay" field
    When I click "cantor.buttonForBay"
    Then I should see "Za malo pieniedzy :(" alert

  Scenario: When I sell foreign currency
    Then I confirm alert
    When I enter "1002" into "cantor.windowForStartValue" field
    And I click "cantor.acceptStartValue"
    Then I should see "1,002.00" in "cantor.valuePln"
    When I enter "100" into "cantor.windowForBay" field
    And I click "cantor.buttonForBay"
    Then  I should see "100" in "cantor.valueUsd"
    When I enter "50" into "cantor.windowForSell" field
    And I click "cantor.buttonForSell"
    Then I should see "50" in "cantor.valueUsd"

  Scenario: When I Sell value and is alert
    When I enter "1005" into "cantor.windowForStartValue" field
    And I click "cantor.acceptStartValue"
    Then I should see "1,005.00" in "cantor.valuePln"
    When I enter "100" into "cantor.windowForBay" field
    And I click "cantor.buttonForBay"
    Then  I should see "100" in "cantor.valueUsd"
    When I enter "110" into "cantor.windowForSell" field
    And I click "cantor.buttonForSell"
    Then I should see "Za malo pieniedzy  :(" alert
    Then I confirm alert

