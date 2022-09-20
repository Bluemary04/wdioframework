import { Given } from "@wdio/cucumber-framework";

Given(/^(.*) page is opened and loaded$/, async function (page) {
    await browser.url(`https://www.${page}.com`);
    await browser.maximizeWindow();
  });