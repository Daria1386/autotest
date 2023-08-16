it('удаление созданной подстанции', async function () {
    await sleep(2000);
    const nameSubstation = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
    const btnDelite = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button')).click();
    //отменить удаление
    const alert = await driver.switchTo().alert();
    await alert.dismiss();
    //подтвердить удаление
    const btnDelit = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/button')).click();
    const alertAgain = await driver.switchTo().alert();
    await alertAgain.accept();
    await sleep(15000);
    const nameNewSubstation = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[1]')).getText();
    assert.notEqual(nameSubstation, nameNewSubstation, 'Удаление подстанции не произошло');
});