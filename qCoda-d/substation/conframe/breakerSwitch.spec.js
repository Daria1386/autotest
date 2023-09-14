import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Login from '../../class/LoginCodaD.js';
import ProjectSelector from '../../class/ProjectSelection.js';
import ConframeOpen from './class/OpenConframe.js';
import ContextMenuBreaker from './class/ContextMenuBreaker.js';
import BreakerSwitcher from './class/BreakerSwitch.js';

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

    it('открытие Конфрейм', async function () {
        let conframe = new ConframeOpen(driver);
        await conframe.openConframe();
    });

    it('нажатие правой кнопкой мыши на выключатель. контекстное меню = 5 строк', async function () {
        let open = new ContextMenuBreaker(driver);
        await open.checkContextMenu();
    });

    it('переключение выключателя', async function () {
        let open = new BreakerSwitcher(driver);
        await open.switchBreaker();
    });
})