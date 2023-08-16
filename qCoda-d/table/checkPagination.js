import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class PaginationChecker {
    constructor(driver) {
        this.driver = driver;
    }

    async checkPagination() {
        await Utils.sleep(2000);

        const nextPageButton = await this.driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[2]'));
        let initialRecordsInfo = await this.driver.findElement(By.id('table_info')).getText();

        await nextPageButton.click();

        await Utils.sleep(2000);

        let currentPageRecordsInfo = await this.driver.findElement(By.id('table_info')).getText();
        assert.notEqual(initialRecordsInfo, currentPageRecordsInfo, 'Количество записей на 2 странице такое же, как и на начальной странице');

        const secondNextPageButton = await this.driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[3]'));
        await secondNextPageButton.click();

        await Utils.sleep(2000);

        let newCurrentPageRecordsInfo = await this.driver.findElement(By.id('table_info')).getText();
        assert.notEqual(currentPageRecordsInfo, newCurrentPageRecordsInfo, 'Количество записей на 3 странице такое же, как и на начальной странице');
    }
}

export default PaginationChecker;