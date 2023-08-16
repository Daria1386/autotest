import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class LineDeletion {
    constructor(driver) {
        this.driver = driver;
    }

    async deleteLine() {
        await Utils.sleep(4000);
        const nameLine = await this.driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
        const btnDeleteLine = await this.driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button'));
        await btnDeleteLine.click();
        // Отменить удаление
        const alert = await this.driver.switchTo().alert();
        await alert.dismiss();
        // Подтвердить удаление
        const btnDeleteLineAgain = await this.driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button'));
        await btnDeleteLineAgain.click();
        const alertAgain = await this.driver.switchTo().alert();
        await alertAgain.accept();
        await Utils.sleep(15000);
        const nameNewLine = await this.driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
        assert.notEqual(nameLine, nameNewLine, 'Удаление линии не произошло');
    }
}

export default LineDeletion;