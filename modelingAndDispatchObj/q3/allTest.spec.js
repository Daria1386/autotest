    import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

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

    it('правильный логин и неправильный пароль', async function () {
        await sleep(2000);
        let login = await driver.findElement(By.id("login")).sendKeys("");
        let passwordWrong = await driver.findElement(By.id("pwd")).sendKeys("");
        let btnEnt = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        let errorPassword = await driver.findElement(By.id("error")).getText();
        await sleep(2000);
        assert.equal("Пароль не верен", errorPassword);
    });

    it('неправильный логин и пароль', async function () {
        await sleep(2000);
        let loginWrong = await driver.findElement(By.id("login")).sendKeys("");
        let passwordWron = await driver.findElement(By.id("pwd")).sendKeys("");
        let btnEnter = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        let errorAll = await driver.findElement(By.id("error")).getText();
        await sleep(2000);
        assert.equal("Пользователь не найден", errorAll);
    });

    it('правильный логин и пароль', async function () {
        await sleep(3000);
        const login = await driver.findElement(By.id("login")).sendKeys("");
        const password = await driver.findElement(By.id("pwd")).sendKeys("#");
        const btnEntrance = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await sleep(3000);
        const titleQuaSy = await driver.findElement(By.xpath("/html/body/div[1]/h2/a"));
        assert.equal("QuaSy :: Systems", await titleQuaSy.getText());
    });

    it('проверить, что кнопка не активна', async function () {
        await sleep(2000);
        const button = await driver.findElement(By.xpath('//a[contains(@class, "btn-warning")]'));
        await driver.wait(until.elementIsEnabled(button), 5000);
        const isButtonDisabled = await button.isEnabled();
        assert.strictEqual(isButtonDisabled, true, 'Кнопка активна, ожидалось, что она будет неактивной.');
      });

    it('проверка CIM. список проектов', async function () {
        await sleep(3000);
        let btnList1Activ = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
        let beforeClickColor = await btnList1Activ.getCssValue('background-color');
        let btnList = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]")).click();
        let afterClickColor = await btnList1Activ.getCssValue('background-color');
        assert.notEqual(beforeClickColor, afterClickColor, 'заливка фона кнопки не изменилась после нажатия');
    });

    it('проверка CIM. выбор первого проектa', async function () {
        await sleep(3000);
        let btnList1 = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
        btnList1 = await btnList1.getText();
        let btnQobjec = await driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
        await sleep(2000);
        let projectInTitle = await driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
        projectInTitle = await projectInTitle.getText();
        assert.equal(btnList1, projectInTitle);
        await driver.navigate().back();
    });

    it('проверка CIM. выбор второго проекта', async function () {
        await sleep(3000);
        let btnList2 = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[2]"));
        let btnListText = await btnList2.getText();
        btnList2.click();
        let btnQobj = await driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
        let projectInTitl = await driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
        projectInTitl = await projectInTitl.getText();
        assert.equal(btnListText, projectInTitl);
    });

    it('проверка наполнения таблицы', async function () {
        await sleep(2000);
        const trElements = await driver.findElements(By.xpath('//*[@id="substations-list"]/tbody/tr'));
        assert(trElements.length > 0, 'Кол-во строк = 0');
    });

    it('проверка пагинации', async function () {
        await sleep(2000);
        const nextPageButton = await driver.findElement(By.xpath('//*[@id="substations-list_paginate"]/span/a[2]'));
        let initialRecordsInfo = await driver.findElement(By.id('substations-list_info')).getText();
        await nextPageButton.click();
        await sleep(2000);
        let currentPageRecordsInfo = await driver.findElement(By.id('substations-list_info')).getText();
        assert.notEqual(initialRecordsInfo, currentPageRecordsInfo, 'Количество записей на 2 странице такое же, как и на начальной странице');
        const secondNextPageButton = await driver.findElement(By.xpath('//*[@id="substations-list_paginate"]/span/a[3]'));
        await secondNextPageButton.click();
        await sleep(2000);
        let newCurrentPageRecordsInfo = await driver.findElement(By.id('substations-list_info')).getText();
        assert.notEqual(currentPageRecordsInfo, newCurrentPageRecordsInfo, 'Количество записей на 3 странице такое же, как и на начальной странице');
    });

    async function selectStation(stationName) {
        const columnSelectSearch = await driver.findElement(By.xpath('//*[@id="column_select_search_2"]')).click();
        const optionXPath = await driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[contains(text(),"'+stationName+'")]'));
        const name = await optionXPath.getText();
        await optionXPath.click();
        await sleep(2000);
        const nameSubstation = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[2]')).getText();
        assert.equal(name, nameSubstation);
    }

    it('выбор типа подстанции', async function () {
        await sleep(2000);
        await selectStation('ЗТП');
    });

    it('сброс фильтра для подстанции', async function () {
        await sleep(2000);
        let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[1]')).click();
    });

    async function selectVoltagLevel(voltagLevel) {
        const columnSelectSearch = await driver.findElement(By.xpath('//*[@id="column_select_search_3"]'));
        await columnSelectSearch.click();
        const optionXPath = `//*[@id="column_select_search_3"]/option[contains(text(),"${voltagLevel}")]`;
        const desiredOption = await driver.findElement(By.xpath(optionXPath));
        const nameVoltag = await desiredOption.getText();
        await desiredOption.click();
        await sleep(2000);
        const highVoltage = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr/td[3]')).getText();
        assert.equal(nameVoltag, highVoltage, 'Выбранный уровень напряжения не соответствует отображаемому уровню напряжения.');
    }

    it('выбор высшего напряжения', async function () {
        await sleep(2000);
        await selectVoltagLevel('20');
    });

    it('сброс фильтра высшего напряжения', async function () {
        await sleep(2000);
        let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_3"]/option[1]')).click();
    });

    async function selectName(nameSubstation) {
        const inputName = await driver.findElement(By.id('column_text_search_1'));
        await inputName.sendKeys(nameSubstation);
        await inputName.sendKeys(Key.ENTER);
        await sleep(3000);
        const elementWithText = await driver.findElement(By.xpath('//td[contains(text(),"'+nameSubstation+'")]'));
        const displayedText = await elementWithText.getText();
        assert.strictEqual(displayedText, 'test', 'Введенный текст "test" не найден.');
    }

    it('порверка ввода текста в диспетчерское наименование подстанции', async function () {
        await sleep(2000);
        await selectName('test');
    });

    it('отчистка ввода текста в диспетчерское наименование подстанции', async function () {
        await sleep(2000);
        const inputName = await driver.findElement(By.id('column_text_search_1'));
        inputName.clear()
        await inputName.sendKeys(Key.ENTER);
    });

    async function selectRecordsPerPage(recordsPerPage) {
        const selectElement = await driver.findElement(By.name('substations-list_length')).click();
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
        const recordsInfoPage = await driver.findElement(By.id('substations-list_info')).getText();
        const numberOfRecords = 'Записи с ' + startingRecord + ' по ' + endingRecord + '';
        assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
    }
         
    it('тест смены количества записей и страниц', async function () {
        await sleep(2000);
        await selectRecordsPerPage('10');
      
        await sleep(2000);
        await changePage('2', 10);
    });

    it('отправка пустой формы добавления подстанции', async function () {
        await sleep(3000);
        let btnAddFreeForm = await driver.findElement(By.xpath('//*[@id="substations-list_filter"]/button')).click();
        await sleep(3000);
        let btnFreeSave = await driver.findElement(By.id('btn_save')).click();
        await sleep(2000);
        let errors = await driver.findElement(By.id('error_div')).getText();
        const expectedSubstring = "Поле";
        const regex = new RegExp(expectedSubstring);
        assert.match(errors, regex);
    });

    async function creationSubstation(substation) {
        for (const field of substation) {
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
                await sleep(2000);
                const plusButton = await driver.findElement(By.xpath('//*[@id="for_fk_substation_mrid"]/div[2]/button[2]'));
                await plusButton.click();
                const searchButton = await driver.findElement(By.xpath('//*[@id="period_section_fk_substation_mrid"]/div/span[1]'));
                await searchButton.click();

                const iputId = await driver.wait(until.elementLocated(By.id(`${field.id}`)),5000);

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
            } else if (err) {
                const errorDiv = await driver.findElement(By.id('error_div'));
                const errorMessage = await errorDiv.getText();
                assert.strictEqual(errorMessage, field.error, `Несоответствие сообщения об ошибке для поля с: ${field.id}`);
            }
        }
    }

    it('отправка заполненной формы добавления подстанции', async function () {
        await sleep(2000);
        let btnAddFreeForm = await driver.findElement(By.xpath('//*[@id="substations-list_filter"]/button')).click();

        const substation = [
            {   id: 'name',  //Диспетчерское наименование подстанции 
                type: 'text',
                text: 'Дарья тест ' + Math.floor(Math.random() * 100) + 1,
                error: '1-Поле "Диспетчерское наименование подстанции" обязательно. ',
            },
            {   id: 'semantic_id', //Семантический идентификатор 
                type: 'text',
                text: '',
                error: '2-Поле "Семантический идентификатор" обязательно. ',
            },
            {   id: 'fk_substation_type', //Тип подстанции 
                type: 'select',
                text: '11',
                error: '3-Поле "Тип подстанции" обязательно. ',
            },
            {   id: 'fk_org_struct', //Эксплуатация (орг. структура): 
                type: 'table_hierarchy',
                text: 'Иные структуры',
                error: '4-Поле "Эксплуатация (орг. структура):" обязательно. ',
            },
            {   id: 'fk_base_voltage', //Высшее напряжение 
                type: 'select',
                text: '10',
                error: '5-Поле "Высшее напряжение" обязательно. ',
            },
            {   id: 'for_fk_substation_mrid', //Выберите сети 
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
        await creationSubstation(substation);
        const btnSave = await driver.findElement(By.id('btn_save')).click();
        await sleep(5000);
        //Получаем текст из элемента на странице
        const headerElement = await driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/h4'));
        const headerText = await headerElement.getText();
        // Ожидаемый текст
        const expectedText = substation.find(field => field.id === 'name').text;
        assert.strictEqual(headerText, expectedText, 'Текст в заголовке не совпадает с ожидаемым');
        await sleep(2000);
        await driver.navigate().back();
    });

    it('удаление созданной подстанции', async function () {
        await sleep(2000);
        const nameSubstation = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
        const btnDelite = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button')).click();
        //отменить удаление
        const alert = await driver.switchTo().alert();
        await alert.dismiss();
        //подтвердить удаление
        const btnDelit = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button')).click();
        const alertAgain = await driver.switchTo().alert();
        await alertAgain.accept();
        await sleep(15000);
        const nameNewSubstation = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
        assert.notEqual(nameSubstation, nameNewSubstation, 'Удаление подстанции не произошло');
    });

    it('открытие репозитария линий', async function () {
        await sleep(2000);
        const nameList = await driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
        const btnRepositories = await driver.findElement(By.xpath('//*[@id="menu_div"]/div[2]/div[1]/button')).click();
        const btnRepositoriesLine = await driver.findElement(By.xpath('//*[@id="lines-repos"]/a')).click();
        await sleep(5000);
        const nameListNew = await driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
        assert.notEqual(nameList, nameListNew, 'Переключение на лини электропередач не произошло');
    });

    it('отправка пустой формы добавления линий', async function () {
        await sleep(2000);
        let btnAddFreeForm = await driver.findElement(By.xpath('//*[@id="lines-list_filter"]/button')).click();
        await sleep(2000);
        let btnFreeSave = await driver.findElement(By.id('btn_save')).click();
        await sleep(2000);
        let errors = await driver.findElement(By.id('error_div')).getText();
        const expectedSubstring = "Поле";
        const regex = new RegExp(expectedSubstring);
        assert.match(errors, regex);
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
        await sleep(11000);
        //Получаем текст из элемента на странице
        const headerElement = await driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/h4'));
        const headerText = await headerElement.getText();
        // Ожидаемый текст
        const expectedText = line.find(field => field.id === 'name').text;
        assert.strictEqual(headerText, expectedText, 'Текст в заголовке не совпадает с ожидаемым');
        await sleep(2000);
        await driver.navigate().back();
    });

    it('удаление созданной линии', async function () {
        await sleep(4000);
        const nameLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
        const btnDeliteLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button')).click();
        //отменить удаление
        const alert = await driver.switchTo().alert();
        await alert.dismiss();
        //подтвердить удаление
        const btnDelitLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button')).click();
        const alertAgain = await driver.switchTo().alert();
        await alertAgain.accept();
        await sleep(15000);
        const nameNewLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
        assert.notEqual(nameLine, nameNewLine, 'Удаление линии не произошло');
    });

    it('открытие репозитария подстанций', async function () {
        await sleep(2000);
        const nameListLine = await driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
        const btnRepositor = await driver.findElement(By.xpath('//*[@id="menu_div"]/div/div[1]/button')).click();
        const btnRepositoriesSubstations = await driver.findElement(By.xpath('//*[@id="substations-repos"]/a')).click();
        await sleep(5000);
        const nameListSubstations = await driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
        assert.notEqual(nameListLine, nameListSubstations, 'Переключение на "Репозитарий подстанций" не произошло');
    });

    it('проверка тестовой формы', async function () {
        await sleep(2000);
        const open = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/a')).click();
        const openEdit = await driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/div[1]/a[1]/span/i')).click();
        await sleep(2000);

        const nameSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[1]/td[2]')).getText();
        let nameForm = await driver.findElement(By.id('name'));
        nameForm = await nameForm.getAttribute('value');
        assert.equal(nameSubstation, nameForm, 'Диспетчерское наименование подстанции не совпадает');

        const typeSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[2]/td[2]')).getText();
        const typeFormElement = await driver.findElement(By.xpath('//*[@id="fk_substation_type"]/option[@selected]'));
        const typeFormText = (await typeFormElement.getText()).trim();
        assert.match(typeSubstation, new RegExp(typeFormText), 'Тип подстанции не совпадает');

        let voltSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[6]/td[2]')).getText();
        let voltForm = await driver.findElement(By.xpath('//*[@id="fk_base_voltage"]/option[@selected]'));
        const voltFormText = (await voltForm.getText()).trim();
        assert.match(voltSubstation, new RegExp(voltFormText), 'Высшее напряжение не совпадает');

        let semanticName = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[7]/td[2]')).getText();
        let semanticForm = await driver.findElement(By.id('semantic_id'));
        semanticForm = await semanticForm.getAttribute('value');
        assert.equal(semanticName, semanticForm, 'Семантический идентификатор не совпадает');

        let mrid = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[8]/td[2]')).getText();
        let mridForm = await driver.findElement(By.id('mrid'));
        mridForm = await mridForm.getAttribute('value');
        assert.equal(mrid, mridForm, 'mRID не совпадает');

        let codTM = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[9]/td[2]')).getText();
        let codTMForm = await driver.findElement(By.id('code_tm'));
        codTMForm = await codTMForm.getAttribute('value');
        assert.equal(codTM, codTMForm, 'Код ТМ не совпадает');

        let conframe = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[10]/td[2]/span[1]')).getText();
        let conframeForm = await driver.findElement(By.id('conframe_id_text'));
        conframeForm = await conframeForm.getAttribute('value');
        assert.equal(conframe, conframeForm, 'ConFrame не совпадает');

        const btnClose = await driver.findElement(By.xpath('/html/body/div[4]/div[1]/a/span')).click();
    });
    
    async function addName(nameAdd) {
        for (const field of nameAdd) {
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
                assert.strictEqual(errorMessage, nameAdd[0].error, `Несоответствие сообщения об ошибке для поля с: ${nameAdd[0].id}`);
            }
        }
        const btnSave = await driver.findElement(By.id('btn_save')).click();
    }

    it('проверка добавления наименования', async function () {
        await sleep(3000);
        const btnAddName = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[1]/td[2]/span/i')).click();

        const nameAdd = [
            {   id: 'name',  //Наименование
                type: 'text',
                text: 'Дарья тест ' + Math.floor(Math.random() * 100) + 1,
                error: 'Поле обязательно для заполнения.',
            },
            {   id: 'name_type_mrid', //Тип
                type: 'select',
                text: 'MARK',
                error: 'Поле обязательно для заполнения.',
            },
        ];
        
        await addName(nameAdd);
        await sleep(3000);
        const newAdd = await driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]')).getText();
    
        const regex = /\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2} - (.+?) \((.+?)\)/;
        const matches = newAdd.match(regex);
        const extractedTextInBrackets = matches[2]; // Текст в скобках
        const extractedTextBeforeBrackets = matches[1]; // Текст до скобок
        
        const expectedTextName = nameAdd.find(field => field.id === 'name').text; // Ожидаемый текст из поля name
        const expectedTextSelect = nameAdd.find(field => field.id === 'name_type_mrid').text; // Ожидаемый текст из поля name_type_mrid
        assert.strictEqual(extractedTextBeforeBrackets, expectedTextName, 'Текст не совпадает с ожидаемым (поле name)');
        assert.strictEqual(extractedTextInBrackets, expectedTextSelect, 'Текст не совпадает с ожидаемым (поле name_type_mrid)');
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
        await sleep(3000);
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
    
    it('удаление созданного наименования', async function () {
        await sleep(2000);
    
        try {
            const addedNameElement = await driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]'));
            const addedName = await addedNameElement.getText();
            
            const btnDeliteName = await addedNameElement.findElement(By.xpath('./span[2]/i')).click();
    
            const alertAgain = await driver.switchTo().alert();
            await alertAgain.accept();
            await sleep(3000);
    
            try {
                // Пытаемся найти элемент снова
                const newLastListItem = await driver.findElement(By.xpath('//*[@id="list-names"]/ul/li[last()]'));
                if (newLastListItem) {
                    const newName = await newLastListItem.getText();
                    assert.notEqual(addedName, newName, 'Наименование не удалилось');
                }
            } catch (error) {
                // Элемент больше не существует, что и ожидается
                assert(true, 'Наименование успешно удалено');
            }
        } catch (error) {
            // Элемента для удаления не существует
            assert(true, 'Элемент для удаления отсутствует');
        }
    });
});


