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