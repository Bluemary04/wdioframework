Feature: Customer search 

    #@demo @e2e
    Scenario Outline: <testid>: unable to find costumer
        Given I get a list of users from reqres.in
        And nopcommerce page is opened and loaded 
        When I login as ADMIN to nopcommerce site
        And I filter users in customer list
        Then I expect the users are not in the customer list

        Examples:
           | testid | 
           | COMM-01|

    #@demo @e2e
    Scenario Outline: <testid>: find user by email
        Given nopcommerce page is opened and loaded 
        When I login as ADMIN to nopcommerce site
        And I filter users in customer list
        And I search an user using victoria_victoria@nopCommerce.com email

        Examples:
           | testid | 
           | COMM-02|