it('нажатие правой кнопкой мыши на выключатель. контекстное меню = 5 строк', async function () {
    await sleep(2000);
    const zoneSixLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'breaker_')]"));
    // Нажатие правой кнопки мыши
    await driver.actions().contextClick(zoneSixLines).perform();
    await sleep(1000);

    const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
    assert.strictEqual(popUp.length, 7, 'Кол-во строк не равно 5');
});