import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class SubstationDelet {
    constructor(driver) {
        this.driver = driver;
    }

    async deleteSubstation() {
        await Utils.sleep(2000);

        const nameSubstation = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
        const btnDelete = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button'));
        await btnDelete.click();

        // Отменить удаление
        const alert = await this.driver.switchTo().alert();
        await alert.dismiss();

        // Подтвердить удаление
        const btnDeleteAgain = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button'));
        await btnDeleteAgain.click();

        const alertAgain = await this.driver.switchTo().alert();
        await alertAgain.accept();

        await Utils.sleep(15000);

        const nameNewSubstation = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
        assert.notEqual(nameSubstation, nameNewSubstation, 'Удаление подстанции не произошло');
    }
}

export default SubstationDelet;