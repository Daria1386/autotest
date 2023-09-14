import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../../Auth/Auth.js';
import ChekCIM from '../../chekCIM.js';

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

    async function editName(newNameAdd) {
        for (const field of newNameAdd) {
            await sleep(2000);
            const element = await driver.findElement(By.id(field.id));
            if (field.type === 'text') {
                await element.clear(); // Очищаем поле
                await element.sendKeys(field.text);
            } else if (field.type === 'select') {
                await element.click();
                const optionElement = await driver.findElement(By.xpath(`//select[@id="${field.id}"]/option[contains(text(), "${field.text}")]`)).click();
            } else if (field.error === '') {
                const errorDiv = await driver.findElement(By.id('error_div'));
                const errorMessage = await errorDiv.getText();
                assert.strictEqual(errorMessage, newNameAdd[0].error, `Несоответствие сообщения об ошибке для поля с: ${newNameAdd[0].id}`);
            }
        }
        const btnSave = await driver.findElement(By.id('btn_save')).click();
    }

    it('редактирование списка наименования', async function () {
        await sleep(2000);
        const open = await driver.findElement(By.xpath('//tr[contains(., "Дарья тест")]/td[9]/div/a')).click();
        await sleep(2000);
        const btnAddName = await driver.findElement(By.xpath('//table/tbody/tr[1]/td[2]/span/i')).click();
        await sleep(1000);
        const editButton = await driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]/span[1]/i')).click();
        
        const newNameAdd = [
            {   id: 'name',  //Наименование
                type: 'text',
                text: 'Замена. Дарья тест ' + Math.floor(Math.random() * 100) + 1,
                error: 'Поле обязательно для заполнения.',
            },
            {   id: 'name_type_mrid', //Тип
                type: 'select',
                text: 'Тип 1',
                error: 'Поле обязательно для заполнения.',
            },
        ];
        
        await editName(newNameAdd);
        await sleep(3000);
        const newEditedName = await driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]')).getText();
        
        const regex = /\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2} - (.+?) \((.+?)\)/;
        const matches = newEditedName.match(regex);
        const textInBrackets = matches[2]; // Текст в скобках
        const textBeforeBrackets = matches[1]; // Текст до скобок
        
        const textName = newNameAdd.find(field => field.id === 'name').text; // Ожидаемый текст из поля name
        const textSelect = newNameAdd.find(field => field.id === 'name_type_mrid').text; // Ожидаемый текст из поля name_type_mrid
        assert.strictEqual(textBeforeBrackets, textName, 'Текст не совпадает с ожидаемым (поле name)');
        assert.strictEqual(textInBrackets, textSelect, 'Текст не совпадает с ожидаемым (поле name_type_mrid)');
    });
});