import Utils from '../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class RepositorySwitcher {
    constructor(driver) {
        this.driver = driver;
    }

    async switchToSubstationsRepository() {
        await Utils.sleep(2000);

        const nameListLine = await this.driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
        const btnRepositor = await this.driver.findElement(By.xpath('//*[@id="menu_div"]/div/div[1]/button'));
        await btnRepositor.click();

        const btnRepositoriesSubstations = await this.driver.findElement(By.xpath('//*[@id="substations-repos"]/a'));
        await btnRepositoriesSubstations.click();

        await Utils.sleep(5000);

        const nameListSubstations = await this.driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
        assert.notEqual(nameListLine, nameListSubstations, 'Переключение на "Репозитарий подстанций" не произошло');
    }
}

export default RepositorySwitcher;