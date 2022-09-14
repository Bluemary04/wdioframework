Feature: Web interactions

    @demo
    Scenario Outline: Demo web interactions
        Given the-internet.herokuapp page is opened in /inputs path
        When I perform input web interactions

        Examples:
            | TestID |
            | WEB-02 |