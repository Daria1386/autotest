it('открытие репозитария линий', async function () {
    await sleep(2000);
    const nameList = await driver.findElement(By.xpath('//*[@id="substations-list_wrapper"]/div[2]/h1')).getText();
    const btnRepositories = await driver.findElement(By.xpath('//*[@id="menu_div"]/div[2]/div[1]/button')).click();
    const btnRepositoriesLine = await driver.findElement(By.xpath('//*[@id="lines-repos"]/a')).click();
    await sleep(5000);
    const nameListNew = await driver.findElement(By.xpath('//*[@id="lines-list_wrapper"]/div[2]/h1')).getText();
    assert.notEqual(nameList, nameListNew, 'Переключение на лини электропередач не произошло');
});