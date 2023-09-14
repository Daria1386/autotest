import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Login from '../../class/LoginCodaD.js';
import ProjectSelector from '../../class/ProjectSelection.js';
import ConframeOpen from './class/OpenConframe.js';
import ContextMenuGroundDisconnector from './class/ContextMenuGroundDisconnector.js';
import GroundDisconnectorSwitch from './class/GroundDisconnectorSwitch.js';

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

    it('нажатие правой кнопкой мыши на Заземляющий нож / Короткозамыкатель. контекстное меню = 5 строки', async function () {
        let open = new ContextMenuGroundDisconnector(driver);
        await open.checkContextMenu();
    });

    it('переключение Заземляющего ножа / Короткозамыкателя', async function () {
        let open = new GroundDisconnectorSwitch(driver);
        await open.switchDisconnector('6665b0e6-2bd0-3cd8-cafe-9f2ea4186c27');
    });
})