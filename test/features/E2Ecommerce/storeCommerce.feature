Feature: Customer search 

    @smoke 
    Scenario Outline: <testid>: unable to find costumer
        Given I get a list of users from reqres.in
        And nopcommerceUrl page is opened and loaded 
        When I login as ADMIN to nopcommerce site
        And I filter users in customer list
        Then I expect the users are not in the customer list

        Examples:
           | testid | 
           | COMM-01|

    @smoke  @e2e
    Scenario Outline: <testid>: find user by email
        Given nopcommerceUrl page is opened and loaded 
        When I login as ADMIN to nopcommerce site
        And I filter users in customer list
        And I search an user using victoria_victoria@nopCommerce.com email
        Then the result box should have 1 result

        Examples:
           | testid | 
           | COMM-02|