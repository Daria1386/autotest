import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../../Helpers/Utils.js';

class ConframeOpen {
    constructor(driver) {
        this.driver = driver;
    }

    async openConframe() {
        await Utils.sleep(3000);
        const qCoda = await this.driver.getTitle();
        const btnConframe = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[10]/td[5]/div/a[2]'));
        await this.driver.executeScript("arguments[0].click();", btnConframe);

        const currentWindowHandle = await this.driver.getWindowHandle();
        const windowHandles = await this.driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
        await this.driver.switchTo().window(newWindowHandle);
        await Utils.sleep(2000);

        const coda = await this.driver.getTitle();
        assert.notEqual(qCoda, coda, 'Страница не соответствует ожидаемой');
    }
}

export default ConframeOpen;