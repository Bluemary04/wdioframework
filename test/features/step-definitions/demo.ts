import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  await browser.url("https://www.google.com");
  console.log("url opened");
  await browser.pause(1000);
});

When(/^Search with (.*)$/, async function (SearchItem) {
  console.log("search item >>>>>>>>>>>>>>>>>>>>>>>>>>");
  let ele = await $('[name="q"]');

  await ele.setValue(SearchItem);
  await browser.keys("Enter");
});

When(/^I click on the first result$/, async function () {
  let ele = await $("<h3>");
  await ele.click();
});

Then(/^the URL should match (.*)$/, async function (ExpectedURL) {
  console.log(ExpectedURL);
  const url = await browser.getUrl();
  chai.expect(url).to.equal(ExpectedURL);
});

/**
 * web interactions
 */

Given(/^(.*) page is opened in (.*) path$/, async function (page, path) {
  console.log(page);
  await browser.url(`https://${page}.com${path}`);
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^I perform input web interactions$/, async function () {
  /**
   * input box: get the element, set value and then set key value slowly
   */
  const input = await $('input[type="number"]');
  const string = "12345";
  await input.click();
  await input.setValue(123);
  for (let i = 0; i < string.length; i++) {
    let charStr = string.charAt(i);
    await browser.pause(1000);
    await browser.keys(charStr);
  }
});
