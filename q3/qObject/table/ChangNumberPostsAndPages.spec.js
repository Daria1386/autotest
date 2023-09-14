import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../../Auth/Auth.js';
import ChekCIM from '../../chekCIM.js';
import ChangNumberPostsAndPages from './class/ChangNumberPostsAndPages.js';

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

    it('проверка CIM. выбор второго проекта', async function () {
        let second = new ChekCIM(driver);
        await second.checkSelectSecondProject();
    });

    it('тест смены количества записей и страниц', async function () {
        let change = new ChangNumberPostsAndPages(driver);
        await change.selectRecordsPerPage('10');
    
        let page = new ChangNumberPostsAndPages(driver);
        await page.changePage('2', 10);
    });
});


