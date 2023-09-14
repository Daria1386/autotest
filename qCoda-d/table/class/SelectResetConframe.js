import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class ConFrameSelector {
    constructor(driver) {
        this.driver = driver;
    }

    async typeConFrame(ConFrame) {
        await Utils.sleep(2000);
        const btnSelectName = await this.driver.findElement(By.xpath(`//*[@id="column_select_search_5"]/option[contains(text(),"${ConFrame}")]`));
        const oldType = await btnSelectName.getText();
        await btnSelectName.click();

        await this.driver.wait(until.elementIsEnabled(this.driver.switchTo().activeElement()));
        await this.driver.switchTo().activeElement().sendKeys(Key.ENTER);

        await Utils.sleep(3000);
        
        const selectConFrameNew = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.equal(oldType, selectConFrameNew, 'Тип ConFrame не соответствует выбранному');
    }

    async resetConFrame() {
        await Utils.sleep(2000);

        const oldType = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        const clineSubstation = await this.driver.findElement(By.xpath('//*[@id="column_select_search_5"]/option[1]'));
        await clineSubstation.click();

        await Utils.sleep(2000);

        const newType = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.notEqual(oldType, newType, 'Фильтр ConFrame не сбросился');
    }
}

export default ConFrameSelector;

/*
    it('выбор ConFrame', async function () {
        await sleep(2000);
        await typeConFrame('Топологическая модель');
    });
*/