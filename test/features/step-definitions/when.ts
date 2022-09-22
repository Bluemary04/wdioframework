import { When } from "@wdio/cucumber-framework";
import reporter from '../../helper/reporter';

When(/^I login to the inventory app$/, async function () {
  reporter.addStep(this.testid, 'info', 'Logged in to Sauce demo')
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
