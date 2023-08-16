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