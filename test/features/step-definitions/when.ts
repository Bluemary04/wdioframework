import { When } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter";
import nopcommerceHomePage from "../../page-objects/nopcommerceHomePage";
import nopcommerceCustomerPage from "../../page-objects/nopcommerceCustomerPage";
import sauceHomePage from "../../page-objects/sauceHomePage";

When(
  /^I login to the inventory app with (STANDARD)*$/,
  async function (userType) {
    reporter.addStep(this.testid, "info", "Logging in to Sauce demo");
    const standardUsername = process.env.TEST_STD_USERNAME;
    const password = process.env.TEST_PASS;

    try {
      await sauceHomePage.loginToSauceApp(
        this.testid,
        standardUsername,
        password
      );
    } catch (error) {
      error.message = `${this.testid}: Failed at login step, ${error.message}`;
      throw error;
    }
  }
);

When(
  /^I login as (ADMIN)* to nopcommerce site*$/,
  async function (userType) {
    if(!userType) throw Error (`Given user: ${userType} is not valid`)
    userType = userType.trim().toUpperCase();
    reporter.addStep(this.testid, "info", `Logging in to nop commerce app`);
    try {
      reporter.addStep(this.testid, "info", `Logging in to nop commerce app`);
      //@ts-ignore
      await nopcommerceHomePage.loginToNopcommerce(this.testid, browser.config.nopcommerceUrl, process.env[`NOP_${userType}_USERNAME`], process.env[`NOP_${userType}_PASS`])
    } catch (error) {
      error.message = `${this.testid}: Failed at nopcommer login, ${error.message}`;
      throw error;
    }
  }
);

When(/^I filter users in customer list$/,async function() {
    try {
      const filterType = await nopcommerceCustomerPage.customerOptions
      const filterOptions = await nopcommerceCustomerPage.customerList
      await nopcommerceCustomerPage.filterOptions(this.testid, filterType , filterOptions)
    } catch (err) {
      err.message = `${this.testid}: Failed to filter customer list, ${err.message}`;
      throw err;
    }
  }
);

When(/^I search an user using (.*) email$/,async function(email) {
  try {
    await nopcommerceCustomerPage.searchByEmail(this.testid, email)
    await browser.pause(10000)
  } catch (err) {
    err.message = `${this.testid}: Failed to search user with ${email} email, ${err.message}`;
      throw err;
  }
}
);
