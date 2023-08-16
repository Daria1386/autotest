    it('нажатие правой кнопкой мыши. контекстное меню = 3 строки', async function () {
        await sleep(2000);
        const zoneThreeLines = await driver.findElement(By.xpath("//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][contains(@class, 'busbar_section_')]"));
        // Нажатие правой кнопки мыши
        await driver.actions().contextClick(zoneThreeLines).perform();
        await sleep(1000);

        const popUp = await driver.findElements(By.xpath('//*[@id="pop_up_window_div"]/li'));
        assert.strictEqual(popUp.length, 4, 'Кол-во строк не равно 3');
    });
  