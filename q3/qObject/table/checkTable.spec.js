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

async function selectTypeStation(stationName) {
    const columnSelectSearch = await this.driver.findElement(By.xpath('//*[@id="column_select_search_2"]'));
    await columnSelectSearch.click();
    const optionXPath = await this.driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[contains(text(),"' + stationName + '")]'));
    const name = await optionXPath.getText();
    await optionXPath.click();
    await Utils.sleep(2000);
    const nameSubstation = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[2]')).getText();
    assert.equal(name, nameSubstation);
}

it('сброс фильтра для подстанции', async function () {
    await sleep(2000);
    let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_2"]/option[1]')).click();
});

async function selectVoltageLevel(voltagLevel) {
    const columnSelectSearch = await this.driver.findElement(By.xpath('//*[@id="column_select_search_3"]'));
    await columnSelectSearch.click();
    const optionXPath = `//*[@id="column_select_search_3"]/option[contains(text(),"${voltagLevel}")]`;
    const desiredOption = await this.driver.findElement(By.xpath(optionXPath));
    const nameVoltage = await desiredOption.getText();
    await desiredOption.click();
    await Utils.sleep(2000);
    const highVoltage = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr/td[3]')).getText();
    assert.equal(nameVoltage, highVoltage, 'Выбранный уровень напряжения не соответствует отображаемому уровню напряжения.');
}

it('сброс фильтра высшего напряжения', async function () {
    await sleep(2000);
    let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_3"]/option[1]')).click();
});

async function selectName(nameSubstation) {
    const inputName = await this.driver.findElement(By.id('column_text_search_1'));
    await inputName.sendKeys(nameSubstation);
    await inputName.sendKeys(Key.ENTER);
    await Utils.sleep(3000);
    const elementWithText = await this.driver.findElement(By.xpath('//td[contains(text(),"' + nameSubstation + '")]'));
    const displayedText = await elementWithText.getText();
    assert.strictEqual(displayedText, 'test', 'Введенный текст "test" не найден.');
}

it('отчистка ввода текста в диспетчерское наименование подстанции', async function () {
    await sleep(2000);
    const inputName = await driver.findElement(By.id('column_text_search_1'));
    inputName.clear()
    await inputName.sendKeys(Key.ENTER);
});