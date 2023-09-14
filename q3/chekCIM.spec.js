import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from './Auth/Auth.js';
import ChekCIM from './chekCIM.js';

describe('First script', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async () => await driver.quit()); //закрытие окна после завершения тестов

    it('First Selenium script', async function () {
        await driver.get('http://dunlin.dunrose.local/security/login.php?path=/q3/');

        let title = await driver.getTitle();
        assert.equal("Авторизация в системе СППР", title);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    it('авторизация', async function () {
        let login = new Auth(driver);
        await login.authorization();
    });

    it('проверить, что кнопка не активна', async function () {
        let second = new ChekCIM(driver);
        await second.checkInactiveButton();
    });

    it('проверка CIM. список проектов', async function () {
        let second = new ChekCIM(driver);
        await second.checkButtonColorChange();
    });

    it('проверка CIM. выбор первого проектa', async function () {
        let second = new ChekCIM(driver);
        await second.checkSelectFirstProject();
    });

    it('проверка CIM. выбор второго проекта', async function () {
        let second = new ChekCIM(driver);
        await second.checkSelectSecondProject();
    });
});


