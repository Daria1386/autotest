    import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

describe('First script', function () {
        let driver;

            before(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
            });

            //after(async () => await driver.quit());

            it('First Selenium script', async function () {
            await driver.get('http://dunlin.dunrose.local/security/login.php?path=/qcoda-d/');

            let title = await driver.getTitle();
            assert.equal("Авторизация в системе СППР", title);
                

            });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        };

    it('правильный логин и пароль', async function () {
        await sleep(3000);
        const login = await driver.findElement(By.id("login")).sendKeys("ruban321");
        const password = await driver.findElement(By.id("pwd")).sendKeys("123");
        const btnEntrance = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await sleep(3000);
        const qCoda = await driver.getTitle();
        assert.equal("qCODA_D", qCoda, 'Страница не соответствует ожидаемой');
    });

    it('выбор рабочего проекта', async function () {
        await sleep(3000);
        const select = await driver.findElement(By.id("projects")).click();
        const prodject = await driver.findElement(By.xpath('//*[@id="projects"]/option[18]'));
        const prodjectNameText = await prodject.getText();
        await prodject.click();
        await sleep(2000);
        let newName = await driver.findElement(By.xpath('//*[@id="projects"]/option[@selected]'));
        const newNameText = await newName.getText();
        assert.equal(prodjectNameText, newNameText,'Проект не соответствует выбранному');
    });

    it('проверка наполнения таблицы', async function () {
        await sleep(2000);
        const trElements = await driver.findElements(By.xpath('//*[@id="table"]/tbody/tr'));
        assert(trElements.length > 0, 'Кол-во строк = 0');
    });

    it('проверка пагинации', async function () {
        await sleep(2000);
        const nextPageButton = await driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[2]'));
        let initialRecordsInfo = await driver.findElement(By.id('table_info')).getText();
        await nextPageButton.click();
        await sleep(2000);
        let currentPageRecordsInfo = await driver.findElement(By.id('table_info')).getText();
        assert.notEqual(initialRecordsInfo, currentPageRecordsInfo, 'Количество записей на 2 странице такое же, как и на начальной странице');
        const secondNextPageButton = await driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[3]'));
        await secondNextPageButton.click();
        await sleep(2000);
        let newCurrentPageRecordsInfo = await driver.findElement(By.id('table_info')).getText();
        assert.notEqual(currentPageRecordsInfo, newCurrentPageRecordsInfo, 'Количество записей на 3 странице такое же, как и на начальной странице');
    });
    
    async function selectType(stationType) {
        const columnSelectSearch = await driver.findElement(By.xpath('//*[@id="column_select_search_4"]')).click();
        const optionXPath = await driver.findElement(By.xpath(`//*[@id="column_select_search_4"]/option[contains(text(),"${stationType}")]`));
        const name = await optionXPath.getText();
        await optionXPath.click();
        await sleep(2000);
        const typeSubstation = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[3]')).getText();
        assert.equal(name, typeSubstation, 'Тип объекта не соответствует выбранному');
    }

    it('выбор типа объекта', async function () {
        await sleep(2000);
        await selectType('ПС');
    });

    it('сброс фильтра для объекта', async function () {
        await sleep(2000);
        let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_4"]/option[1]')).click();
    });
    
    async function typeConFrame(ConFrame) {
        const btnSelectName = await driver.findElement(By.xpath(`//*[@id="column_select_search_5"]/option[contains(text(),"${ConFrame}")]`));
        const oldType = await btnSelectName.getText();
        await btnSelectName.click();

        await driver.wait(until.elementIsEnabled(driver.switchTo().activeElement()));
        await driver.switchTo().activeElement().sendKeys(Key.ENTER);
        await sleep(3000);
        
        const selectConFrameNew = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.equal(oldType, selectConFrameNew, 'Тип ConFrame не соответствует выбранному');
    }

    it('выбор ConFrame', async function () {
        await sleep(2000);
        await typeConFrame('Топологическая модель');
    });

    it('сброс фильтра ConFrame', async function () {
        await sleep(2000);
        const oldType = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_5"]/option[1]')).click();
        await sleep(2000);
        const newType = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.notEqual(oldType, newType, 'Фильтр ConFrame не сбросился');
    });

    async function selectName(nameSubstation) {
        const inputName = await driver.findElement(By.id('column_text_search_2'));
        await inputName.sendKeys(nameSubstation);
        await inputName.sendKeys(Key.ENTER);
        await sleep(3000);
        const elementWithText = await driver.findElement(By.xpath('//td[contains(text(),"'+nameSubstation+'")]'));
        const displayedText = await elementWithText.getText();
        assert(displayedText, 'test', 'Введенный текст "test" не найден.');
    }

    it('порверка ввода текста в диспетчерское наименование подстанции', async function () {
        await sleep(2000);
        await selectName('test');
    });

    it('отчистка ввода текста в диспетчерское наименование подстанции', async function () {
        await sleep(2000);
        const inputName = await driver.findElement(By.id('column_text_search_2'));
        inputName.clear()
    });

    it('переключение на Линии', async function () {
        await sleep(2000);
        const oldBtn = await driver.findElement(By.className('active')).getText();
        const btnLine = await driver.findElement(By.xpath('//*[@id="tabs"]/li[2]/a')).click();
        await sleep(2000);
        const newBtn = await driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    });

    async function selectRecordsPage(recordsPerPage) {
        const selectElement = await driver.findElement(By.name('table_length')).click();
        await sleep(2000);
        const optionElement = await driver.findElement(By.css('option[value="' + recordsPerPage + '"]'));
        const optionName = await optionElement.getText();
        await optionElement.click();
        assert.equal(optionName, recordsPerPage, 'Количество записей не изменилось');
    }

    async function changePage(pageNumber, recordsPerPage) {
        await sleep(2000);
        const pageElement = await driver.findElement(By.xpath('//span/a[text()="' + pageNumber + '"]'));
        await pageElement.click();
        const startingRecord = (pageNumber - 1) * recordsPerPage + 1;
        const endingRecord = pageNumber * recordsPerPage;
        await sleep(2000);
        const recordsInfoPage = await driver.findElement(By.id('table_info')).getText();
        const numberOfRecords = 'Записи с ' + startingRecord + ' по ' + endingRecord + '';
        assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
    }
         
    it('тест смены количества записей и страниц', async function () {
        await sleep(2000);
        await selectRecordsPage('25');
      
        await sleep(2000);
        await changePage(2, 25);
    });

    it('проверка кликабельности кнопки "карты"', async function () {
        await sleep(2000);
        const qCoda = await driver.getTitle();
        const btnMap = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[5]/div/a[2]')).click();

        const currentWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
        await driver.switchTo().window(newWindowHandle);
        await sleep(2000);

        const qGeoVision = await driver.getTitle();
        assert.notEqual(qCoda, qGeoVision, 'Страница не соответствует ожидаемой');
        await driver.close();
        await driver.switchTo().window(currentWindowHandle);
    });
    
    it('переключение на Схемы сети', async function () {
        await sleep(3000);
        const oldBtn = await driver.findElement(By.className('active')).getText();
        const btnLine = await driver.findElement(By.xpath('//*[@id="tabs"]/li[3]/a'));
        await driver.executeScript("arguments[0].click();", btnLine);
        await sleep(2000);
        const newBtn = await driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    });

    it('переключение на Подстанции', async function () {
        await sleep(3000);
        const oldBtn = await driver.findElement(By.className('active')).getText();
        const btnLine = await driver.findElement(By.xpath('//*[@id="tabs"]/li[1]/a')).click();
        await sleep(2000);
        const newBtn = await driver.findElement(By.className('active')).getText();
        assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
    });

    it('кликабельность кнопки "Объектный моделлер подстанции"', async function () {
        await sleep(3000);
        const qCoda = await driver.getTitle();
        const btnFile = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[5]/div/a[1]'));
        await driver.executeScript("arguments[0].click();", btnFile);

        const currentWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
        await driver.switchTo().window(newWindowHandle);
        await sleep(2000);

        const coda = await driver.getTitle();
        assert.notEqual(qCoda, coda, 'Страница не соответствует ожидаемой');
        await driver.close();
        await driver.switchTo().window(currentWindowHandle);
    });

    it('открытие Конфрейм', async function () {
        await sleep(3000);
        const qCoda = await driver.getTitle();
        const btnConframe = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[10]/td[5]/div/a[2]'));
        await driver.executeScript("arguments[0].click();", btnConframe);

        const currentWindowHandle = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
        await driver.switchTo().window(newWindowHandle);
        await sleep(2000);

        const coda = await driver.getTitle();
        assert.notEqual(qCoda, coda, 'Страница не соответствует ожидаемой');
    });

    it('нажатие правой кнопкой мыши. контекстное меню = 2 строки', async function () {
        await sleep(2000);
        const freeZone = await driver.findElement(By.id('svg'));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(freeZone).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 2, 'Кол-во строк не равно 2');
    });
    
    it('нажатие правой кнопкой мыши. контекстное меню = 3 строки', async function () {
        await sleep(2000);
        const zoneThreeLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'busbar_section_')]"));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(zoneThreeLines).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 4, 'Кол-во строк не равно 3');
    });
    
    it('нажатие правой кнопкой мыши на выключатель. контекстное меню = 5 строк', async function () {
        await sleep(2000);
        const zoneSixLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'breaker_')]"));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(zoneSixLines).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 7, 'Кол-во строк не равно 5');
    });
   
    it('переключение выключателя', async function () {
        await sleep(2000);
        const switching = await driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
        // Выполнение действий для включения или отключения оборудования
        const currentStateSelect = await driver.findElement(By.id('current_state_prop'));
        const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
        const currentStateValue = await currentStateOption.getAttribute('value');
        // Определение, какое действие нужно выполнить
        let actionOptionIndex;
            if ((currentStateValue === 'OPENED')) { // Оборудование включено
                actionOptionIndex = 1;
            } else if ((currentStateValue === 'CLOSED')) {  // Оборудование выключено
                actionOptionIndex = 2;
            }
        // Выбор нужного действия
        const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`)).click();
        const checkbox = await driver.findElement(By.id('confirm_change_status_checked')).click();
        const execute = await driver.findElement(By.id('set_change_status_element')).click();
        await sleep(2000);
        // Проверка состояния оборудования
        const MRID = 'f37bf614-d4de-79d8-8023-b6b13622edfc';
        const btnOn = await driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[local-name()='rect'][@display='none']`));
            if (btnOn.length > 0) {
                console.log('Оборудование включено');
            } else {
                console.log('Оборудование выключено');
            }
    });

    it('нажатие правой кнопкой мыши на выкатную тележку. контекстное меню = 5 строки', async function () {
        await sleep(2000);
        const zoneSixLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'one_side_')]"));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(zoneSixLines).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 5, 'Кол-во строк не равно 5');
    });

    it('переключение выкатной тележки', async function () {
        await sleep(2000);
        const switching = await driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
        // Выполнение действий для включения или отключения оборудования
        const currentStateSelect = await driver.findElement(By.id('current_state_prop'));
        const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
        const currentStateValue = await currentStateOption.getAttribute('value');
        // Определение, какое действие нужно выполнить
        let actionOptionIndex;
            if ((currentStateValue === 'WORKING')) { // Рабочее положение
                actionOptionIndex = 2;
            } else if ((currentStateValue === 'REPAIR')) {  // Ремонтное положение
                actionOptionIndex = 3;
            }  else if ((currentStateValue === 'CONTROL')) {  // Контрольное положение
                actionOptionIndex = 1;
            }
        // Выбор нужного действия
        const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`)).click();
        const checkbox = await driver.findElement(By.id('confirm_change_status_checked')).click();
        const execute = await driver.findElement(By.id('set_change_status_element')).click();
        await sleep(2000);
        // Проверка состояния оборудования
        const MRID = '9d044fa4-34ab-3d0a-4bfc-c3406cc340de';
        const position = await driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[@display='none']`));
        if (position.length === 6) {
                console.log('Рабочее положение');
            } else if(position.length === 5) {
                console.log('Ремонтное положение');
            } else if(position.length === 3){
                console.log('Контрольное положение');
            }
    });

    it('нажатие правой кнопкой мыши на Заземляющий нож / Короткозамыкатель. контекстное меню = 5 строки', async function () {
        await sleep(2000);
        const zoneSixLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'ground_disconnector_')]"));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(zoneSixLines).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 5, 'Кол-во строк не равно 5');
    });

    it('переключение Заземляющего ножа / Короткозамыкателя', async function () {
        await sleep(2000);
        const switching = await driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
        // Выполнение действий для включения или отключения оборудования
        const currentStateSelect = await driver.findElement(By.id('current_state_prop'));
        const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
        const currentStateValue = await currentStateOption.getAttribute('value');
        // Определение, какое действие нужно выполнить
        let actionOptionIndex;
            if ((currentStateValue === 'OPENED')) { // Оборудование включено
                actionOptionIndex = 1;
            } else if ((currentStateValue === 'CLOSED')) {  // Оборудование выключено
                actionOptionIndex = 2;
            }
        // Выбор нужного действия
        const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`)).click();
        const checkbox = await driver.findElement(By.id('confirm_change_status_checked')).click();
        const execute = await driver.findElement(By.id('set_change_status_element')).click();
        await sleep(2000);
        // Проверка состояния оборудования
        const MRID = '6665b0e6-2bd0-3cd8-cafe-9f2ea4186c27';
        const btnOn = await driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[local-name()='rect'][@display='none']`));
            if (btnOn.length > 0) {
                console.log('Оборудование включено');
            } else {
                console.log('Оборудование выключено');
            }
    });
   

   
    

});

//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='9d044fa4-34ab-3d0a-4bfc-c3406cc340de']/*[local-name()='path'][2][@display='none']
        


//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='9d044fa4-34ab-3d0a-4bfc-c3406cc340de']/*[@display='none']      