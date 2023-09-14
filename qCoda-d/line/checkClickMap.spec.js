import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Login from '../class/LoginCodaD.js';
import ProjectSelector from '../class/ProjectSelection.js';
import SwitchToLine from './class/SwitchToLine.js';
import ClickMap from './class/CheckClickMap.js';

describe('First script', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async () => await driver.quit());

    it('First Selenium script', async function () {
        await driver.get('http://dunlin.dunrose.local/security/login.php?path=/qcoda-d/');

        let title = await driver.getTitle();
        assert.equal("Авторизация в системе СППР", title);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    it('правильный логин и пароль', async function () {
        let login = new Login(driver);
        await login.authorization();
    });

    it('выбор рабочего проекта', async function () {
        let project = new ProjectSelector(driver);
        await project.selectProject();
    });

    it('переключение на Линии', async function () {
        let line = new SwitchToLine(driver);
        await line.switchLine();
    });

    it('тест смены количества записей и страниц', async function () {
        let check = new ClickMap(driver);
        await check.checkMapLink();
    });
})