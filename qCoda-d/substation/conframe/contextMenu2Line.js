import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class ContextMenu2line {
    constructor(driver) {
        this.driver = driver;
    }

    async checkContextMenu() {
        await Utils.sleep(2000);

        const freeZone = await this.driver.findElement(By.id('svg'));
        // Нажатие правой кнопки мыши
        await this.driver.actions().contextClick(freeZone).perform();
        await Utils.sleep(1000);

        const popUp = await this.driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 2, 'Кол-во строк не равно 2');
    }
}

export default ContextMenu2line;