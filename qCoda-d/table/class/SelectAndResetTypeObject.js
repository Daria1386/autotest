import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class StationTypeSelector {
    constructor(driver) {
        this.driver = driver;
    }

    async selectType(stationType) {
        const columnSelectSearch = await this.driver.findElement(By.xpath('//*[@id="column_select_search_4"]'));
        await columnSelectSearch.click();

        const optionXPath = await this.driver.findElement(By.xpath(`//*[@id="column_select_search_4"]/option[contains(text(),"${stationType}")]`));
        const name = await optionXPath.getText();
        await optionXPath.click();

        await Utils.sleep(2000);

        const typeSubstation = await this.driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[3]')).getText();
        assert.equal(name, typeSubstation, 'Тип объекта не соответствует выбранному');
    }
    async cleanSelect() {
        await Utils.sleep(2000);
        const clineSubstation = await this.driver.findElement(By.xpath('//*[@id="column_select_search_4"]/option[1]'));
        await clineSubstation.click();
    }
}

export default StationTypeSelector;

/*
    it('выбор типа объекта', async function () {
        await sleep(2000);
        await selectType('ПС');
    });
*/