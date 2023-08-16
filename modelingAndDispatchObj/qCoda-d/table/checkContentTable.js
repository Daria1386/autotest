import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class TableContentChecker {
    constructor(driver) {
        this.driver = driver;
    }

    async checkRowCount() {
        await Utils.sleep(2000);
        const trElements = await this.driver.findElements(By.xpath('//*[@id="table"]/tbody/tr'));
        assert(trElements.length > 0, 'Кол-во строк = 0');
    }
}

export default TableContentChecker;