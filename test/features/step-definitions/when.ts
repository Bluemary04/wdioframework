import { When } from "@wdio/cucumber-framework";

When(/^I login to the inventory app$/, async function () {
    await $('#user-name').setValue(process.env.TEST_STD_USERNAME);
    await $('#password').setValue(process.env.TEST_PASS);
    await $('#login-button').click();

    /**Login with a different user */
    // await browser.pause(2000);
    // await browser.reloadSession();
    // await browser.url(`https://www.saucedemo.com`);
    // await $('#user-name').setValue(process.env.TEST_PROBLEM_USERNAME);
    // await $('#password').setValue(process.env.TEST_PASS);
    // await $('#login-button').click();
  });
