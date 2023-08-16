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