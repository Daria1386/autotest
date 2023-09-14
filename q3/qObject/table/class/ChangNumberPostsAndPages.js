    import Utils from '../../../../Helpers/Utils.js';
    import { By } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

    class ChangNumberPostsAndPages {

        constructor(driver){
            this.driver = driver;
        }

        async selectRecordsPerPage(recordsPerPage) {
            const selectElement = await this.driver.findElement(By.name('substations-list_length')).click();
            await Utils.sleep(2000);
            const optionElement = await this.driver.findElement(By.css('option[value="' + recordsPerPage + '"]'));
            const optionName = await optionElement.getText();
            await optionElement.click();
            assert.equal(optionName, recordsPerPage, 'Количество записей не изменилось');
        }
        
        async changePage(pageNumber, recordsPerPage) {
            await Utils.sleep(2000);
            const pageElement = await this.driver.findElement(By.xpath('//span/a[text()="' + pageNumber + '"]'));
            await pageElement.click();
            const startingRecord = (pageNumber - 1) * recordsPerPage + 1;
            const endingRecord = pageNumber * recordsPerPage;
            await Utils.sleep(2000);
            const recordsInfoPage = await this.driver.findElement(By.id('substations-list_info')).getText();
            const numberOfRecords = 'Записи с ' + startingRecord + ' по ' + endingRecord + '';
            assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
        }
    }

    export default ChangNumberPostsAndPages;


/*
    it('тест смены количества записей и страниц', async function () {
    await sleep(2000);
    await selectRecordsPerPage('10');
  
    await sleep(2000);
    await changePage('2', 10);
    });
*/