import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class SelectTypeStation {
    constructor(driver) {
        this.driver = driver;
    }

    async selectTypeStation(stationName) {
        const columnSelectSearch = await this.driver.findElement(By.xpath('//*[@id="column_select_search_2"]'));
        await columnSelectSearch.click();
        const optionXPath = await this.driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[contains(text(),"' + stationName + '")]'));
        const name = await optionXPath.getText();
        await optionXPath.click();
        await Utils.sleep(2000);
        const nameSubstation = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[2]')).getText();
        assert.equal(name, nameSubstation);
    }

    async clineType() {
        await Utils.sleep(2000);
        const clineSubstation = await this.driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[1]'));
        await clineSubstation.click();
    }
}

export default SelectTypeStation;

/*
    it('выбор типа подстанции', async function () {
    await sleep(2000);
    await selectTypeStation('ЗТП');
    });
*/    