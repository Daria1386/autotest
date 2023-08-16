import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class SwitchToLine {
    constructor(driver) {
        this.driver = driver;
    }

    async switchLine() {
        await Utils.sleep(2000);

        const oldBtn = await this.driver.findElement(By.className('active')).getText();
        const btnLine = await this.driver.findElement(By.xpath('//*[@id="tabs"]/li[2]/a'));
        await btnLine.click();

        await Utils.sleep(2000);

        const newBtn = await this.driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    }
}

export default SwitchToLine;