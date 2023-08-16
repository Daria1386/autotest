it('удаление созданной линии', async function () {
    await sleep(4000);
    const nameLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
    const btnDeliteLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button')).click();
    //отменить удаление
    const alert = await driver.switchTo().alert();
    await alert.dismiss();
    //подтвердить удаление
    const btnDelitLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[10]/div/button')).click();
    const alertAgain = await driver.switchTo().alert();
    await alertAgain.accept();
    await sleep(15000);
    const nameNewLine = await driver.findElement(By.xpath('//*[@id="lines-list"]/tbody/tr[1]/td[1]')).getText();
    assert.notEqual(nameLine, nameNewLine, 'Удаление линии не произошло');
});