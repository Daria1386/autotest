import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../../../Auth/Auth.js';
import chekCIM from '../../chekCIM.js';
import CheckNetworkList from './checkNetworkList.js'

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
        let authObj = new Auth(driver);
        await authObj.authorization();
    });

    it('проверка CIM. выбор второго проекта', async function () {
        const CIMTests = new chekCIM(driver);
        await CIMTests.checkSelectSecondProject();
    });

    it('проверка типа-сети', async function () {
        await sleep(2000);
        const checkList = new CheckNetworkList(driver);
        await checkList.selectNetwork('Новая Москва');
    });

    it('выбор типа подстанции', async function () {
        await sleep(2000);
        const checkkList = new CheckNetworkList(driver);
        await checkkList.refreshNetwork('Северные ЭС');
    });
})