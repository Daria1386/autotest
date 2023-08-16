import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class PageChanger {
    constructor(driver) {
        this.driver = driver;
    }

    async changePageAndPost(pageNumber, recordsPerPage) {
        await Utils.sleep(2000);
        const pageElement = await this.driver.findElement(By.xpath(`//span/a[text()="${pageNumber}"]`));
        await pageElement.click();
        const startingRecord = (pageNumber - 1) * recordsPerPage + 1;
        const endingRecord = pageNumber * recordsPerPage;
        await Utils.sleep(2000);
        const recordsInfoPage = await this.driver.findElement(By.id('table_info')).getText();
        const numberOfRecords = `Записи с ${startingRecord} по ${endingRecord}`;
        assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
    }
}

export default PageChanger;