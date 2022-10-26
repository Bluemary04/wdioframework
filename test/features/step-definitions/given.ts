import { Given } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter";
import sauceHomePage from "../../page-objects/sauceHomePage";
import nopcommerceHomePage from "../../page-objects/nopcommerceHomePage";
import constants from "../../../data/constants.json";
import apiHelper from "../../helper/apiHelper";
import fs from "fs";

Given(/^(.*) page is opened and loaded$/, async function (pageUrl) {
  try {
    await nopcommerceHomePage.navigateTo(browser.config[pageUrl]);
  } catch (err) {
    throw err;
  }
});


Given(/^I get a list of (.*) from reqres.in$/, async function (endpointRef) {
  if(!endpointRef) throw Error(`Given endpoint ref: ${endpointRef} is not valid`);
  try {
    /**1. Get payload data */
    reporter.addStep(this.testid, "info", `Getting the payload data for endpoint: ${endpointRef}`)
    let endpoint = ""
    if(endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if(!endpoint) throw Error(`Error getting endpoint: ${endpoint} from constants`)
  
    /**2. Make get call */
    let res 
    await browser.call(async ()=> {
      //@ts-ignore
      res = await apiHelper.GET(this.testid, browser.config.reqresBaseUrl, endpoint, "", constants.REQRES.QUERY_PARAM)
    }) 
    //@ts-ignore
    if(res.status !== 200) chai.expect.fail(`Failed getting users from: ${browser.config.reqresBaseUrl}/${endpoint}`)
    reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)
   
    /**3 store results */
    let data = JSON.stringify(res.body, undefined, 4);
    let filename = `${process.cwd()}/data/api-res/reqresAPI.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`);
  } catch (err) {
    err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
    throw err;
  }
});