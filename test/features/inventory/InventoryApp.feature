Feature: Sauce lab inventory app

    #@smoke
    Scenario Outline: <testid>: Demo advanced web interactions
        Given saucedemo page is opened and loaded
        When I login to the inventory app with STANDARD
        Then Inventory page should list <NumberOfElements>
        And each price item should be greater than <MinimumPrice>

        Examples:
            | testid | NumberOfElements | MinimumPrice |
            | INV-01 | 6                | 1            |