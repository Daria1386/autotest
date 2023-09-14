import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class ClickMap {
    constructor(driver) {
        this.driver = driver;
    }

    async checkMapLink() {
        await Utils.sleep(2000);

        const qCoda = await this.driver.getTitle();
        const btnMap = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[5]/div/a[2]'));
        await btnMap.click();

        const currentWindowHandle = await this.driver.getWindowHandle();
        const windowHandles = await this.driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
        await this.driver.switchTo().window(newWindowHandle);

        await Utils.sleep(2000);

        const qGeoVision = await this.driver.getTitle();
        assert.notEqual(qCoda, qGeoVision, 'Страница не соответствует ожидаемой');

        await this.driver.close();
        await this.driver.switchTo().window(currentWindowHandle);
    }
}

export default ClickMap;