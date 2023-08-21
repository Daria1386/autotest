import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class NewInputValidator {
    constructor(driver) {
        this.driver = driver;
    }

    async validateInput(inputValueHigh, inputValueNeutral) {
        await Utils.sleep(3000);
        const btnOpen = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/a')).click();
        await Utils.sleep(4000);
        const transform = await this.driver.findElement(By.xpath('//*[@id="d82c0720-b48d-4d75-ad6e-d39897c569c2"]/div[1]/div[1]/div[1]')).click();
        const obmotka = await this.driver.findElement(By.xpath('//*[@id="0d9d0970-aed1-4256-8766-11cd5130f5ec"]/div/div[1]/div[1]/div[1]')).click();
        const rpn = await this.driver.findElement(By.xpath('//*[@id="dccaf71d-6721-4865-b115-5b59257d5c85"]/div/table/tbody/tr[24]/td[2]/a[1]/span/i')).click();
        await Utils.sleep(3000);

        const highStep = await this.driver.findElement(By.id("high_step"));
        await highStep.clear();
        await highStep.sendKeys(inputValueHigh);

        const neutralStep = await this.driver.findElement(By.id("neutral_step"));
        await neutralStep.clear();
        await neutralStep.sendKeys(inputValueNeutral);

        const btnSave = await this.driver.findElement(By.id('btn_save')).click();
        await Utils.sleep(3000);

        const errors = await this.driver.findElements(By.id('error_div'));

        if (inputValueNeutral > inputValueHigh) {
            const nameInput = await this.driver.findElement(By.xpath('//*[@id="for_neutral_step"]/label'));
            const nameInputText = await nameInput.getText();
            assert.strictEqual(errors.length, 1);
            const errorText = await errors[0].getText();
            const regex = new RegExp(nameInputText);
            assert.match(errorText, regex);
        } else {
            assert.strictEqual(errors.length, 0);
        }  
    }
}

export default NewInputValidator;

