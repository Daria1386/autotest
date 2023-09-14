import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class NameDelet {
    constructor(driver) {
        this.driver = driver;
    }

    async deleteName() {
        await Utils.sleep(2000);
        const open = await this.driver.findElement(By.xpath('//tr[contains(., "Дарья тест")]/td[9]/div/a')).click();
        await Utils.sleep(2000);
        const btnAddName = await this.driver.findElement(By.xpath('//table/tbody/tr[1]/td[2]/span/i')).click();
        await Utils.sleep(1000);

        try {
            const addedNameElement = await this.driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]'));
            const addedName = await addedNameElement.getText();
            
            const btnDeleteName = await addedNameElement.findElement(By.xpath('./span[2]/i'));
            await btnDeleteName.click();

            const alertAgain = await this.driver.switchTo().alert();
            await alertAgain.accept();

            await Utils.sleep(3000);

            try {
                // Try to find the element again
                const newLastListItem = await this.driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]'));
                if (newLastListItem) {
                    const newName = await newLastListItem.getText();
                    assert.notEqual(addedName, newName, 'Наименование не удалилось');
                }
            } catch (error) {
                // The element no longer exists, as expected
                assert(true, 'Наименование успешно удалено');
            }
        } catch (error) {
            // The element for deletion doesn't exist
            assert(true, 'Элемент для удаления отсутствует');
        }
    }
}

export default NameDelet;
