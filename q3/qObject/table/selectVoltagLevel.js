import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class SelectVoltagLevel {
    constructor(driver) {
        this.driver = driver;
    }

    async selectVoltageLevel(voltagLevel) {
        const columnSelectSearch = await this.driver.findElement(By.xpath('//*[@id="column_select_search_3"]'));
        await columnSelectSearch.click();
        const optionXPath = `//*[@id="column_select_search_3"]/option[contains(text(),"${voltagLevel}")]`;
        const desiredOption = await this.driver.findElement(By.xpath(optionXPath));
        const nameVoltage = await desiredOption.getText();
        await desiredOption.click();
        await Utils.sleep(2000);
        const highVoltage = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr/td[3]')).getText();
        assert.equal(nameVoltage, highVoltage, 'Выбранный уровень напряжения не соответствует отображаемому уровню напряжения.');
    }

    async clineVoltage() {
        await Utils.sleep(2000);
        const clineSubstation = await this.driver.findElement(By.xpath('//*[@id="column_select_search_3"]/option[1]'));
        await clineSubstation.click();
    }
}

export default SelectVoltagLevel;

/*
    it('выбор высшего напряжения', async function () {
    await sleep(2000);
    await selectVoltagLevel('20');
    });
*/