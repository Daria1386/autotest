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