it('проверка кликабельности кнопки "карты"', async function () {
    await sleep(2000);
    const qCoda = await driver.getTitle();
    const btnMap = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[5]/div/a[2]')).click();

    const currentWindowHandle = await driver.getWindowHandle();
    const windowHandles = await driver.getAllWindowHandles();
    const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
    await driver.switchTo().window(newWindowHandle);
    await sleep(2000);

    const qGeoVision = await driver.getTitle();
    assert.notEqual(qCoda, qGeoVision, 'Страница не соответствует ожидаемой');
    await driver.close();
    await driver.switchTo().window(currentWindowHandle);
});