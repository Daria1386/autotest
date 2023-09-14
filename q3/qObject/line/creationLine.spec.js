import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../../Auth/Auth.js';
import ChekCIM from '../../chekCIM.js';
import LineRepositorySwitcher from './classLine/OpenRepositoryLines.js';

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

    it('открытие репозитария линий', async function () {
        let openLine = new LineRepositorySwitcher(driver);
        await openLine.switchToLineRepository();
    });

    async function creationLine(line) {
        for (const field of line) {
            await sleep(2000);
            const element = await driver.findElement(By.id(field.id));

            if (field.type === 'text') {
                await element.sendKeys(field.text);
            } else if (field.type === 'select') {
                await element.click();
                const optionElement = await driver.findElement(By.css(`#${field.id} option[value="${field.text}"]`)).click();
            } else if (field.type === 'table_hierarchy') {
                const btnPlus = await driver.findElement(By.xpath('//*[@id="for_fk_org_struct"]/div/span[1]')).click();
            
                const currentWindowHandle = await driver.getWindowHandle();
                const windowHandles = await driver.getAllWindowHandles();
                const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
                await driver.switchTo().window(newWindowHandle);
            
                await sleep(2000);
            
                const elementToClick = await driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const actions = driver.actions({ bridge: true });
                await actions.doubleClick(elementToClick).perform();

                await driver.switchTo().window(currentWindowHandle);
            } else if (field.type === 'periodical_section') {
                const plusButton = await driver.findElement(By.xpath('//*[@id="for_fk_line_mrid"]/div[2]/button[2]')).click();
                const searchButton = await driver.findElement(By.xpath('//*[@id="period_section_fk_line_mrid"]/div/span[1]')).click();

                const iputId = await driver.wait(until.elementLocated(By.id(`${field.id}`)),2000);

                const currentWindowHandle = await driver.getWindowHandle();
                const windowHandles = await driver.getAllWindowHandles();
                const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
                await driver.switchTo().window(newWindowHandle);
            
                await sleep(2000);
            
                const elementToClick = await driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const elementToClick1 = await driver.findElement(By.xpath(`//td[contains(text(), '${field.text}')]`));
                const actions = driver.actions({ bridge: true });
                await actions.doubleClick(elementToClick1).perform();

                await driver.switchTo().window(currentWindowHandle);
            }

            try {
                const errorDiv = await driver.findElement(By.id('error_div'));
                const errorMessage = await errorDiv.getText();
                assert.strictEqual(errorMessage, field.error, `Несоответствие сообщения об ошибке для поля с: ${field.id}`);
            } catch (error) {
            }
        }
    }

    it('отправка заполненной формы добавления линии', async function () {
    await sleep(2000);
    let btnAddFreeForm = await driver.findElement(By.xpath('//*[@id="lines-list_filter"]/button')).click();

        const line = [
            {   id: 'name',  //Диспетчерское наименование 
                type: 'text',
                text: 'Дарья тест ' + Math.floor(Math.random() * 100) + 1,
                error: '1-Поле "Диспетчерское наименование" обязательно. ',
            },
            {   id: 'semantic_id', //Семантический идентификатор 
                type: 'text',
                text: '',
                error: '2-Поле "Семантический идентификатор" обязательно. ',
            },
            {   id: 'fk_line_type', //Тип линии 
                type: 'select',
                text: '1',
                error: '3-Поле "Тип линии" обязательно. ',
            },
            {   id: 'fk_org_struct', //Эксплуатация (орг. структура): 
                type: 'table_hierarchy',
                text: 'Иные структуры',
                error: '4-Поле "Эксплуатация (орг. структура):" обязательно. ',
            },
            {   id: 'fk_base_voltage', //Номинальное напряжение 
                type: 'select',
                text: '10',
                error: '5-Поле "Номинальное напряжение" обязательно. ',
            },
            {   id: 'for_fk_line_mrid', //Выберите сети 
                type: 'periodical_section',
                text: 'Московский РЭС',
                error: '6-Поле "Выберите сети" обязательно. ',
            },
            {   id: 'code_tm', //Код ТМ 
                type: 'text',
                text: ''+ Math.floor(Math.random() * 200) + 1 + Math.floor(Math.random() * 200) + 1,
                error: '7-Поле "Код ТМ" обязательно. ',
            },
        ];
        await creationLine(line);
        const btnSave = await driver.findElement(By.id('btn_save')).click();
        await sleep(16000);
        //Получаем текст из элемента на странице
        const headerElement = await driver.findElement(By.xpath('//*/table/tbody/tr[1]/td[2]'));
        const headerText = await headerElement.getText();
        // Ожидаемый текст
        const expectedText = line.find(field => field.id === 'name').text;
        assert.strictEqual(headerText, expectedText, 'Текст в заголовке не совпадает с ожидаемым');
        await sleep(2000);
        await driver.navigate().back();
    });
});