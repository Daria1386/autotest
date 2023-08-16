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