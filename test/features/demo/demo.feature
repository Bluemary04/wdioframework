Feature: Demo Feature

    Scenario Outline: Scenario Outline name
        Given Google page is opened
        When Search with <SearchItem>
        And I click on the first result
        Then the URL should match <ExpectedURL>

        Examples:
            | TestID  | SearchItem | ExpectedURL           |
            | Demo-01 | wdio       | https://webdriver.io/ |