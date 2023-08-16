it('кликабельность кнопки "Объектный моделлер подстанции"', async function () {
    await sleep(3000);
    const qCoda = await driver.getTitle();
    const btnFile = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[5]/div/a[1]'));
    await driver.executeScript("arguments[0].click();", btnFile);

    const currentWindowHandle = await driver.getWindowHandle();
    const windowHandles = await driver.getAllWindowHandles();
    const newWindowHandle = windowHandles.find(handle => handle !== currentWindowHandle);
    await driver.switchTo().window(newWindowHandle);
    await sleep(2000);

    const coda = await driver.getTitle();
    assert.notEqual(qCoda, coda, 'Страница не соответствует ожидаемой');
    await driver.close();
    await driver.switchTo().window(currentWindowHandle);
});