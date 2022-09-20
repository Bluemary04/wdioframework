import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  //@ts-ignore
  await browser.url(browser.config.googleURL);
  // get test id
  console.log(`>>> Test id: ${this.testid}`);
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
  /**Wait until: Wait for the title of the page to change for WDIO page title*/
  await browser.waitUntil(async () => {
    return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO";
  }, {timeout: 20000, interval: 500, timeoutMsg: "Could not load WDIO page"});
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

When(/^I perform dropdown web interactions$/, async function () {
  /** dropdown: Select by text and attribute */
  const dropdown = await $("#dropdown");
  await dropdown.selectByVisibleText("Option 2");

  await dropdown.selectByAttribute("Value", "1");

  /** dropdown: Get list of options */
  const dropdownAray = await $$("select > option");
  let arr = [];

  for (let i = 0; i < dropdownAray.length; i++) {
    let ele = dropdownAray[i];
    let val = await ele.getText();
    arr.push(val);
    console.log(`>> Options array are: ${arr}`);
  }
});

When(/^I perform checkbox web interactions$/, async function () {
  /** checkbox: Select and deselect a checkbox item */
  const checkboxes = await $$('[type="checkbox"]');

  if (!await checkboxes[0].isSelected()) {
    await checkboxes[0].click();
  }

  await checkboxes[1].click();

  /** Checkbox: Select all options */
  checkboxes.forEach(async (checkbox) => {
    if (!await checkbox.isSelected()) {
      checkbox.click();
    }
  });
});

When(/^I perform window web interactions$/, async function () {
  /** window: Get window title, switch to new window */
  await $("=Click Here").click();
  await $("=Elemental Selenium").click();
  let currentWindowTitle = await browser.getTitle();
  const parentWindowHandle = await browser.getWindowHandle();
  const winHandles = await browser.getWindowHandles();

  for (let i = 0; i < winHandles.length; i++) {
    console.log(winHandles[i]);
    await browser.switchToWindow(winHandles[i]);
    currentWindowTitle = await browser.getTitle();
    if (
      currentWindowTitle ===
      "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro"
    ) {
      await browser.switchToWindow(winHandles[i]);
      let headerText = await $("<h1>").getText();
      console.log(`>>>> header title: ${headerText}`);
    }
  }

  /**window: Switch back to parent window */
  await browser.switchToWindow(parentWindowHandle);
  const parentTitle = await $("<h3>").getText();
  console.log(`>>> parent window title: ${parentTitle}`);
});

When(/^I perform alerts web interactions$/, async function () {
  /** alert: accept alert */
  await $("button=Click for JS Alert").click();

  if (await browser.isAlertOpen()) {
    await browser.acceptAlert();
  }

  /**Confirm: dismiss alert */
  await $("button=Click for JS Confirm").click();
  if (await browser.isAlertOpen()) {
    await browser.dismissAlert();
  }

  /**Prompt: Get alert value, type text and accept alert */
  await $("button=Click for JS Prompt").click();
  if (await browser.isAlertOpen()) {
    const alertText = await browser.getAlertText();
    console.log(`>>> alert text is: ${alertText}`);
    await browser.sendAlertText("Some random text");
    await browser.acceptAlert();
  }
});

When(/^I perform upload web interactions$/, async function () {
  /**File upload: accept alert */
  await $("#file-upload").addValue(`${process.cwd()}/data/dummyFile.txt`);
  await $("#file-submit").click();
  await browser.debug();
});

When(/^I perform frame web interactions$/, async function () {
  /**Frame: switch to frame and switch back to parent frame */
  await $("=iFrame").click();
  const iFrame = await $("#mce_0_ifr");
  await browser.switchToFrame(iFrame);
  /** Key interaction */
  await $("#tinymce").click();
  await browser.keys(["Meta", "A"]);
  await browser.pause(1000);
  await browser.keys(["Delete"]);

  await $("#tinymce").setValue("Switched to iframe....");

  await browser.switchToParentFrame();
});

When(/^I perform table web interactions$/, async function () {
  /**Table: Validate number of rows and columns */
  const numberOfRows = await $$('//table[@id="table1"]/tbody/tr').length;
  const numberOfColumns = await $$('//table[@id="table1"]/thead/tr/th').length;
  chai.expect(numberOfRows).to.equal(4);
  chai.expect(numberOfColumns).to.equal(6);

  /**Table: get all table values */
  let arr = [];
  for (let i = 0; i < numberOfRows; i++) {
    let personObject = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
    };
    for (let j = 0; j < numberOfColumns; j++) {
      let cellValue = await $(
        `//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`
      ).getText();
      if (j === 0) personObject.lastName = cellValue;
      if (j === 1) personObject.firstName = cellValue;
      if (j === 2) personObject.email = cellValue;
      if (j === 3) personObject.due = cellValue;
      if (j === 4) personObject.web = cellValue;
    }
    arr.push(personObject);
  }
  console.log(`Table values: ${JSON.stringify(arr)}`);

  /**Table: get single cell value */
  let singleArr = [];
  for (let i = 0; i < numberOfRows; i++) {
    let cellValue = await $(
      `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
    ).getText();
    singleArr.push(cellValue);
  }
  console.log(`Single cell values are ${singleArr}`);
});

When(/^I scroll down and up$/, async function () {
  /**Scroll down */
  await browser.execute(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await browser.pause(2000);
  /**Scroll up */
  await browser.execute(() => {
    window.scrollBy(0, -window.innerHeight);
  });
});

Then(
  /^I expect the dropdown selected option contains (.*) text$/,
  async function (expectedText) {
    /**
     * dropdown: check the text of selected option
     */
    const selectedOption = await $('//select/option[@selected="selected"]');
    const optionValue = await selectedOption.getText();
    chai.expect(optionValue).to.equal(expectedText);
  }
);

Then(/^I expect the checkbox item is selected$/, async function () {
  /**
   * checkbox: check the text of selected option
   */
  const checkboxes = await $$('[type="checkbox"]');
  const isSelected = await checkboxes[0].isSelected();
  chai.expect(isSelected).to.be.true;
});
