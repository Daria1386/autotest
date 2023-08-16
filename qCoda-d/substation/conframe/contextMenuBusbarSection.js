import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class ContextMenuBusbarSection {
    constructor(driver) {
        this.driver = driver;
    }

    async checkContextMenu() {
        await Utils.sleep(2000);

        const zoneThreeLines = await this.driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'busbar_section_')]"));
        // Нажатие правой кнопки мыши
        await this.driver.actions().contextClick(zoneThreeLines).perform();
        await Utils.sleep(1000);

        const popUp = await this.driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 4, 'Кол-во строк не равно 3');
    }
}

export default ContextMenuBusbarSection;