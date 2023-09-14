import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class LineRepositorySwitcher {
    constructor(driver) {
        this.driver = driver;
    }

    async switchToLineRepository() {
        await Utils.sleep(2000);

        const nameList = await this.driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
        const btnRepositories = await this.driver.findElement(By.xpath('//*[@id="menu_div"]/div[2]/div[1]/button'));
        await btnRepositories.click();

        const btnRepositoriesLine = await this.driver.findElement(By.xpath('//*[@id="lines-repos"]/a'));
        await btnRepositoriesLine.click();

        await Utils.sleep(5000);

        const nameListNew = await this.driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
        assert.notEqual(nameList, nameListNew, 'Переключение на линии электропередач не произошло');
    }
}

export default LineRepositorySwitcher;