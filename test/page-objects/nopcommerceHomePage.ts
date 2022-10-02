import Page from "./page";
import reporter from "../helper/reporter";

class HomePage extends Page {
  constructor() {
    super();
  }

  /** Page objects */
  public get userInput() { return $("#Email"); }

  public get passwordInput() { return $('#Password')}

  public get loginBtn() { return $('button[type="submit"]') }

  /** Page actions */
  async loginToNopcommerce(testid: string, url: string, username: string, password: string) {
    if(!url || !username || !password) throw Error(`Given data, url: ${url}, username: ${username} or password is not valid`);
    url = url.trim();
    username = username.trim();
    try {
        reporter.addStep(testid, "info", `Login to: ${url} with ${username}`)
        await this.typeInto(await this.userInput, username);
        await this.typeInto(await this.passwordInput, password);
        await this.click(await this.loginBtn);
    } catch (err) {
        err.message = `Failed to login to nopcommerce: ${url}, with username: ${username}, ${err.message}`
        throw err;
    }
  }

}
export default new HomePage();