import Page from "./page";
import reporter from "../helper/reporter";

export default class FiltersPage extends Page {
    constructor() {
        super();
    }

    /** Page objects */
    public get filterContainer() { return $('[data-widget="treeview"]') }

    public get customerOptions() { return $$('li[class*="has-treeview"]')[3] }

    public get customerList() { return this.customerOptions.$('li') }

    // public get noResultMessage() { return $('td[class="dataTables_empty"]') }

    async filterOptions(testid: string, filterCategory: WebdriverIO.Element, filterOption: WebdriverIO.Element) {
        if (!filterCategory || !filterOption) throw new Error(`Invalid filter category or filter option`);
        reporter.addStep(testid, "info", `Filtering using parameters received`)
        try {
            await this.click(filterCategory);
            await this.click(filterOption); //this.customerList
        } catch (error) {
            throw `Failed applying given filters`
        }

    }

}
