it('переключение на Подстанции', async function () {
    await sleep(3000);
    const oldBtn = await driver.findElement(By.className('active')).getText();
    const btnLine = await driver.findElement(By.xpath('//*[@id="tabs"]/li[1]/a')).click();
    await sleep(2000);
    const newBtn = await driver.findElement(By.className('active')).getText();
    assert.notEqual(oldBtn, newBtn, 'Переключение не произошло');
});
