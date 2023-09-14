import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from './Auth.js';

describe('First script', function () {
        let driver;

        before(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
        });

        after(async () => await driver.quit());

        it('First Selenium script', async function () {
            await driver.get('http://dunlin.dunrose.local/security/login.php?path=/q3/');

            let title = await driver.getTitle();
            assert.equal("Авторизация в системе СППР", title);
        });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    it('неправильный логин', async function () {
        let login = new Auth(driver);
        await login.checkUserNotFound();
    });
    
    it('неправильный пароль', async function () {
        let login = new Auth(driver);
        await login.checkPasswordWrong();
    });

    it('правильный логин и пароль', async function () {
        let login = new Auth(driver);
        await login.authorization();
    });
})