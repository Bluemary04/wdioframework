import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function() {
    await browser.url('https://www.google.com');
    console.log('url opened');
    await browser.pause(1000);
})

When(/^Search with (.*)$/, async function(SearchItem) {
    console.log('search item >>>>>>>>>>>>>>>>>>>>>>>>>>');
    let ele = await $('[name="q"]')

    await ele.setValue(SearchItem)
    await browser.keys('Enter')
})

When(/^I click on the first result$/, async function(){
    let ele = await $('<h3>')
    await ele.click()
})

Then(/^the URL should match (.*)$/, async function(ExpectedURL){
    console.log(ExpectedURL);
    const url = await browser.getUrl();
    chai.expect(url).to.equal(ExpectedURL)
})