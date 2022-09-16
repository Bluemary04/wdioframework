import { When } from "@wdio/cucumber-framework";

When(/^I login to the inventory app$/, async function () {
    await $('#user-name').setValue("standard_user");
    await $('#password').setValue("secret_sauce");
    await $('#login-button').click();

    /**Login with a different user */
    // await browser.pause(2000);
    // await browser.reloadSession();
    // await browser.url(`https://www.saucedemo.com`);
    // await $('#user-name').setValue("problem_user");
    // await $('#password').setValue("secret_sauce");
    // await $('#login-button').click();
  });
