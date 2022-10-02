import Page from "./page";
import reporter from "../helper/reporter";

class HomePage extends Page {
  constructor() {
    super();
  }

  /** Page objects */
  public get userInput() { return $("#user-name"); }

  public get passwordInput() { return $('#password')}

  public get loginBtn() { return $('#login-button') }

  /** Page actions */
  async enterUsername(testid: string, username: string) {
    if (!username) throw new Error(`Given username: ${username} is not valid`);
    try {
        username = username.trim();
        await this.typeInto(await this.userInput,username);
        reporter.addStep(testid, "info", `Username: ${username} entered sucessfully`)
    } catch (err) {
        err.message = `Error entering username, ${err.message}`
        throw err;
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw new Error(`Given password: ${password} is not valid`);
    try {
        password = password.trim();
        await this.typeInto(await this.passwordInput ,password);
        reporter.addStep(testid, "info", `password: ${password} entered sucessfully`)
    } catch (err) {
        err.message = `Error entering password, ${err.message}`;
        throw err;
    }
  }

  async clickLoginBtn(testid: string) {
    try {
        await this.click(await this.loginBtn);
        reporter.addStep(testid, "info", `Login btn click`)
    } catch (err) {
        err.message = `Error clicking button, ${err.message}`;
        throw err;
    }
  }

  async loginToSauceApp(testid: string, username: string, password: string) {
    try {
        await this.enterUsername(testid, username);
        await this.enterPassword(testid, password);
        await this.clickLoginBtn(testid);
    } catch (err) {
        throw err;
    }
  }




}
export default new HomePage();
