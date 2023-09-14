import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class LineCreation {
    constructor(driver) {
        this.driver = driver;
    }

    async createLine(line) {
        for (const field of line) {
            await Utils.sleep(2000);
            const element = await this.driver.findElement(By.id(field.id));

            if (field.type === 'text') {
                await element.sendKeys(field.text);
            } else if (field.type === 'select') {
                await element.click();
                const optionElement = await this.driver.findElement(By.css(`#${field.id} option[value="${field.text}"]`)).click();
            } else if (field.type === 'table_hierarchy') {
                const btnPlus = await this.driver.findElement(By.xpath('//*[@id="for_fk_org_struct"]/div/span[1]')).click();

                const currentWindowHandle = await this.driver.getWindowHandle();
                const windowHandles = await this.driver.getAllWindowHandles();
                const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
                await this.driver.switchTo().window(newWindowHandle);

                await Utils.sleep(2000);

                const elementToClick = await this.driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const actions = this.driver.actions({ bridge: true });
                await actions.doubleClick(elementToClick).perform();

                await this.driver.switchTo().window(currentWindowHandle);
            } else if (field.type === 'periodical_section') {
                const plusButton = await this.driver.findElement(By.xpath('//*[@id="for_fk_line_mrid"]/div[2]/button[2]')).click();
                const searchButton = await this.driver.findElement(By.xpath('//*[@id="period_section_fk_line_mrid"]/div/span[1]')).click();

                const iputId = await this.driver.wait(until.elementLocated(By.id(`${field.id}`)), 2000);

                const currentWindowHandle = await this.driver.getWindowHandle();
                const windowHandles = await this.driver.getAllWindowHandles();
                const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
                await this.driver.switchTo().window(newWindowHandle);

                await Utils.sleep(2000);

                const elementToClick = await this.driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const elementToClick1 = await this.driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const actions = this.driver.actions({ bridge: true });
                await actions.doubleClick(elementToClick1).perform();

                await this.driver.switchTo().window(currentWindowHandle);
            }

            try {
                const errorDiv = await this.driver.findElement(By.id('error_div'));
                const errorMessage = await errorDiv.getText();
                assert.strictEqual(errorMessage, field.error, `Несоответствие сообщения об ошибке для поля с: ${field.id}`);
            } catch (error) {
            }
        }
    }
}

export default LineCreation;