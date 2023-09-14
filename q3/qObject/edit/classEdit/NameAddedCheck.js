import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class NameAddition {
    constructor(driver) {
        this.driver = driver;
    }

    async addName(nameAdd) {
        for (const field of nameAdd) {
            await Utils.sleep(2000);
            const element = await this.driver.findElement(By.id(field.id));

            if (field.type === 'text') {
                await element.clear();
                await element.sendKeys(field.text);
            } else if (field.type === 'select') {
                await element.click();
                const optionElement = await this.driver.findElement(By.xpath(`//select[@id="${field.id}"]/option[contains(text(), "${field.text}")]`)).click();
            } else if (field.error === '') {
                const errorDiv = await this.driver.findElement(By.id('error_div'));
                const errorMessage = await errorDiv.getText();
                assert.strictEqual(errorMessage, nameAdd[0].error, `Несоответствие сообщения об ошибке для поля с: ${nameAdd[0].id}`);
            }
        }
        const btnSave = await this.driver.findElement(By.id('btn_save')).click();
    }
}

export default NameAddition;
