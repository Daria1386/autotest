import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class InputValidator {
    constructor(driver) {
        this.driver = driver;
    }

    async performInputAndValidation(inputValue) {
        await Utils.sleep(3000);
        const btnOpen = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/a')).click();
        await Utils.sleep(3000);
        const transform = await this.driver.findElement(By.xpath('//*[@id="d82c0720-b48d-4d75-ad6e-d39897c569c2"]/div[1]/div[1]/div[1]')).click();
        const obmotka = await this.driver.findElement(By.xpath('//*[@id="0d9d0970-aed1-4256-8766-11cd5130f5ec"]/div/div[1]/div[1]/div[2]/a[2]/span/i')).click();
        await Utils.sleep(2000);

        const phaseAngleClock = await this.driver.findElement(By.id("phase_angle_clock"));
        await phaseAngleClock.clear();
        await phaseAngleClock.sendKeys(inputValue);
        const btnSeve = await this.driver.findElement(By.id('btn_save')).click();
        await Utils.sleep(2000);

        const errors = await this.driver.findElements(By.id('error_div'));

        if (inputValue === "-1" || inputValue === "12") {
            const nameInput = await this.driver.findElement(By.xpath('//*[@id="for_phase_angle_clock"]/label'));
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
export default InputValidator;
