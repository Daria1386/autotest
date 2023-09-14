import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class FreeFormAddition {
    constructor(driver) {
        this.driver = driver;
    }

    async addFreeForm() {
        await Utils.sleep(3000);
        const btnAddFreeForm = await this.driver.findElement(By.xpath('//*[@id="substations-list_filter"]/button'));
        await btnAddFreeForm.click();
        await Utils.sleep(3000);
        const btnFreeSave = await this.driver.findElement(By.id('btn_save'));
        await btnFreeSave.click();
        await Utils.sleep(2000);
        const errors = await this.driver.findElement(By.id('error_div')).getText();
        const expectedSubstring = "Поле";
        const regex = new RegExp(expectedSubstring);
        assert.match(errors, regex);
    }
}

export default FreeFormAddition;