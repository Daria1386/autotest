import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class NameSelector {
    constructor(driver) {
        this.driver = driver;
    }

    async selectName(nameSubstation) {
        const inputName = await this.driver.findElement(By.id('column_text_search_2'));
        await inputName.sendKeys(nameSubstation);
        await inputName.sendKeys(Key.ENTER);
        await Utils.sleep(3000);

        const elementWithText = await this.driver.findElement(By.xpath(`//td[contains(text(),"${nameSubstation}")]`));
        const displayedText = await elementWithText.getText();
        assert.equal(displayedText, 'test', 'Введенный текст "test" не найден.');
    }

    async clearInputName() {
        await Utils.sleep(2000);
        const inputName = await this.driver.findElement(By.id('column_text_search_2'));
        await inputName.clear();
    }
}

export default NameSelector;

/*
    it('порверка ввода текста в диспетчерское наименование подстанции', async function () {
        await sleep(2000);
        await selectName('test');
    });
*/