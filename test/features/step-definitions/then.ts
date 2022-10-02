import { Then } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter";
import nopCustomerList from "../../page-objects/nopcommerceCustomerPage";
import chai from "chai";
import fs from "fs";
import nopcommerceCustomerPage from "../../page-objects/nopcommerceCustomerPage";

Then(/^Inventory page should list (.*)$/, async function (numberOfProducts) {
  if (!numberOfProducts) throw Error("Invalid number provided");

  let productArr = await $$('[class="inventory_item"]');
  // try {
  chai.expect(productArr.length).to.equal(parseInt(numberOfProducts));
  // } catch (err) {
  //     reporter.addStep(this.testid, 'error', 'known issue- product mismatch', true, "JIRA-1001")
  // }
});

Then(
  /^each price item should be greater than (.*)$/,
  async function (minimumPrice) {
    reporter.addStep(this.testid, "info", "Checking the price");
    if (!minimumPrice) throw Error("Invalid number provided");

    let productPricesArr = await $$('[class="inventory_item_price"]');
    let priceArr = [];
    for (let i = 0; i < productPricesArr.length; i++) {
      let price = await productPricesArr[i].getText();
      await priceArr.push(price);
    }

    const priceNumbersArr = priceArr.map((price) => +price.replace("$", ""));
    console.log(priceNumbersArr);
    /** Assert if the values are expected */
    let invalidPriceArr = priceNumbersArr.filter((ele) => ele <= minimumPrice);
    chai.expect(invalidPriceArr.length).to.equal(0);
  }
);

Then(/^I expect the users are not in the customer list$/, async function () {
  /** read API response */
  try {
    let filename = `${process.cwd()}/data/api-res/reqresAPI.json`;
    let data = fs.readFileSync(filename, "utf-8");
    let dataObjects = JSON.parse(data);
  
    const numberOfUsers = dataObjects.data.length
    let arr = []
    /** For each user object in api response */
      for (let i = 0; i < numberOfUsers; i++) {
        let userNotExist= {}
        let firstName = dataObjects.data[i].first_name 
        let lastName = dataObjects.data[i].last_name 
        let custNotFound= await nopcommerceCustomerPage.searchUserByName(this.testid, firstName, lastName)
        if(custNotFound) {
          userNotExist["firstname"] = firstName
          userNotExist["lastname"] = lastName
          arr.push(userNotExist)
        }
      }
  
    if(arr.length > 1) {
      let data = JSON.stringify(arr, undefined, 4);
      let filePath = `${process.cwd()}/results/customerNotFound.json`;
      fs.writeFileSync(filePath, data)
    }
  } catch (err) {
    err.message = `${this.testid}: Failed at checking users in customer list, ${err.message}`;
    throw err;
  }
}
);
