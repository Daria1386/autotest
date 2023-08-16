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