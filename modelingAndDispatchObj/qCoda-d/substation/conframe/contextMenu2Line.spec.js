it('нажатие правой кнопкой мыши. контекстное меню = 2 строки', async function () {
    await sleep(2000);
    const freeZone = await driver.findElement(By.id('svg'));
    // Нажатие правой кнопки мыши
    await driver.actions().contextClick(freeZone).perform();
    await sleep(1000);

    const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
    assert.strictEqual(popUp.length, 2, 'Кол-во строк не равно 2');
});