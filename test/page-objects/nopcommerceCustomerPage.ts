import FiltersPage from "./nopAdminFilters";
import reporter from "../helper/reporter";

class CustomerPage extends FiltersPage {
  constructor() {
    super();
  }

  /** Page objects */
  public get emailInput() { return $('#SearchEmail')}

  public get firstNameInput() { return $("#SearchFirstName"); }

  public get lastNameInput() { return $('#SearchLastName')}

  public get searchBtn() { return $('#search-customers') }

  public get mailResult() { return $$('[aria-describedby="customers-grid_info"] td')[1] }

  public get noResultMessage() { return $('td[class="dataTables_empty"]') } 

  async searchByEmail (testid: string, email: string) {
    if (!email) throw new Error(`Invalid email: ${email}`)
    reporter.addStep(testid, "info", `Searching user using email: ${email}`)
    await this.typeInto(await this.emailInput, email)
    await this.click(await this.searchBtn)
    await browser.pause(1000)
  }

  async searchUserByName( testid: string, firstName: string, lastName: string) {
    if (!firstName || !lastName) throw new Error(`Invalid first name: ${firstName} or lastname: ${lastName}`);
    let nameNotExist = false
    reporter.addStep(testid, "info", `Searching user: ${firstName} ${lastName}`)
    try {
        await this.typeInto(await this.firstNameInput, firstName)
        await this.typeInto(await this.lastNameInput, lastName)
        await this.click(await this.searchBtn)
        await browser.pause(1000)
        let isNotDisplayed = await (await this.noResultMessage).isDisplayed()
        if(isNotDisplayed) nameNotExist = true
    } catch (error) {
        throw `Failed searching given first name: ${firstName} and lastname: ${lastName}`
    }

    return nameNotExist
    
  }

}
export default new CustomerPage();