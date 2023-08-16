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