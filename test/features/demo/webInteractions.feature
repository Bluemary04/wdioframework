Feature: Web interactions

    @demo
    Scenario Outline: Demo <webElement> web interactions
        Given the-internet.herokuapp page is opened in <endpoint> path
        When I perform <webElement> web interactions

        Examples:
            | TestID | endpoint  | webElement |
            | WEB-01 | /inputs   | input      |
            | WEB-02 | /dropdown | dropdown   |
            | WEB-03 | /windows  | window     | 
            | WEB-04 | /javascript_alerts | alerts   |


    Scenario Outline: Demo dropdown web interactions
        Given the-internet.herokuapp page is opened in <endpoint> path
        Then I expect the dropdown selected option contains Please select an option text

        Examples:
            | TestID | endpoint  | webElement |
            | WEB-02 | /dropdown | dropdown   |

    Scenario Outline: Demo checkbox web interactions
        Given the-internet.herokuapp page is opened in <endpoint> path
        When I perform <webElement> web interactions
        Then I expect the checkbox item is selected

        Examples:
            | TestID | endpoint    | webElement |
            | WEB-01 | /checkboxes | checkbox   |

    Scenario Outline: Demo windows web interactions
        Given the-internet.herokuapp page is opened in <endpoint> path
        When I perform <webElement> web interactions
        Then I expect the checkbox item is selected

        Examples:
            | TestID | endpoint    | webElement |
            | WEB-01 | /checkboxes | checkbox   |