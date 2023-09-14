import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class TabSwitcher {
    constructor(driver) {
        this.driver = driver;
    }

    async switchTabAndAssert() {
        await Utils.sleep(3000);

        const oldBtn = await this.driver.findElement(By.className('active')).getText();
        const btnLine = await this.driver.findElement(By.xpath('//*[@id="tabs"]/li[1]/a'));
        await btnLine.click();

        await Utils.sleep(3000);

        const newBtn = await this.driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    }
}

export default TabSwitcher;