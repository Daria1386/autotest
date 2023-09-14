import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class SubstationListValidator {
    constructor(driver) {
        this.driver = driver;
    }

    async validateSubstationList() {
        await Utils.sleep(2000);
        const trElements = await this.driver.findElements(By.xpath('//*[@id="substations-list"]/tbody/tr'));
        assert(trElements.length > 0, 'Кол-во строк = 0');
    }
}

export default SubstationListValidator;