import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class PageChanger {
    constructor(driver) {
        this.driver = driver;
    }

    async selectRecordsPage(recordsPerPage) {
        const selectElement = await this.driver.findElement(By.name('table_length')).click();
        await Utils.sleep(2000);
        const optionElement = await this.driver.findElement(By.css('option[value="' + recordsPerPage + '"]'));
        const optionName = await optionElement.getText();
        await optionElement.click();
        assert.equal(optionName, recordsPerPage, 'Количество записей не изменилось');
    }

    async changePageAndPost(pageNumber, recordsPerPag) {
        await Utils.sleep(2000);
        const pageElement = await this.driver.findElement(By.xpath(`//span/a[text()="${pageNumber}"]`));
        await pageElement.click();
        const startingRecord = (pageNumber - 1) * recordsPerPag + 1;
        const endingRecord = pageNumber * recordsPerPag;
        await Utils.sleep(2000);
        const recordsInfoPage = await this.driver.findElement(By.id('table_info')).getText();
        const numberOfRecords = `Записи с ${startingRecord} по ${endingRecord}`;
        assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
    }
}

export default PageChanger;