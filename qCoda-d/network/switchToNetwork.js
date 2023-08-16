import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class NetworkSwitch {
    constructor(driver) {
        this.driver = driver;
    }

    async switchNetwork() {
        await Utils.sleep(3000);

        const oldBtn = await this.driver.findElement(By.className('active')).getText();
        const btnLine = await this.driver.findElement(By.xpath('//*[@id="tabs"]/li[3]/a'));
        await this.driver.executeScript("arguments[0].click();", btnLine);

        await Utils.sleep(2000);

        const newBtn = await this.driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    }
}

export default NetworkSwitch;