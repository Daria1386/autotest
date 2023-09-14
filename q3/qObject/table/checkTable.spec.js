import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../../Auth/Auth.js';
import ChekCIM from '../../chekCIM.js';
import SubstationListValidator from './class/CheckContentTable.js';
import PaginationValidator from './class/checkPagination.js';
import SelectTypeStation from './class/SelectTypeStation.js';
import SelectVoltagLevel from './class/SelectVoltagLevel.js';
import SelectName from './class/EnterTextDispatcherName.js';

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

    it('проверка наполнения таблицы', async function () {
        let content = new SubstationListValidator(driver);
        await content.validateSubstationList();
    });

    it('проверка пагинации', async function () {
        let pagination = new PaginationValidator(driver);
        await pagination.validatePagination();
    });

    it('выбор типа подстанции', async function () {
        let typeStation = new SelectTypeStation(driver);
        await typeStation.selectTypeStation('ЗТП');
    });

    it('сброс фильтра для подстанции', async function () {
        let cleanTypeStation = new SelectTypeStation(driver);
        await cleanTypeStation.cleanType();
    });

    it('выбор высшего напряжения', async function () {
        let selectVoltage = new SelectVoltagLevel(driver);
        await selectVoltage.selectVoltageLevel('20');
    });

    it('сброс фильтра высшего напряжения', async function () {
        let clean = new SelectVoltagLevel(driver);
        await clean.clineVoltage();
    });

    it('порверка ввода текста в диспетчерское наименование подстанции', async function () {
        let inputName = new SelectName(driver);
        await inputName.selectName('test');
    });

    it('отчистка ввода текста в диспетчерское наименование подстанции', async function () {
        let cleanName = new SelectName(driver);
        await cleanName.clearInput();
    });
});


