Feature: Web interactions

    @smoke
    Scenario Outline: Demo advanced web interactions
        Given saucedemo page is opened and loaded
        When I login to the inventory app
        Then Inventory page should list <NumberOfElements>
        And each price item should be greater than <MinimumPrice>

        Examples:
            | TestID | NumberOfElements | MinimumPrice |
            | INV-01 | 6                | 1            |