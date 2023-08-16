it('открытие репозитария подстанций', async function () {
    await sleep(2000);
    const nameListLine = await driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
    const btnRepositor = await driver.findElement(By.xpath('//*[@id="menu_div"]/div/div[1]/button')).click();
    const btnRepositoriesSubstations = await driver.findElement(By.xpath('//*[@id="substations-repos"]/a')).click();
    await sleep(5000);
    const nameListSubstations = await driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
    assert.notEqual(nameListLine, nameListSubstations, 'Переключение на "Репозитарий подстанций" не произошло');
});