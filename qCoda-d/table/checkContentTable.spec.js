it('проверка наполнения таблицы', async function () {
    await sleep(2000);
    const trElements = await driver.findElements(By.xpath('//*[@id="table"]/tbody/tr'));
    assert(trElements.length > 0, 'Кол-во строк = 0');
});