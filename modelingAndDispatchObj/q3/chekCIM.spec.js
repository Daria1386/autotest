it('проверить, что кнопка не активна', async function () {
    await sleep(2000);
    const button = await driver.findElement(By.xpath('//a[contains(@class, "btn-warning")]'));
    await driver.wait(until.elementIsEnabled(button), 5000);
    const isButtonDisabled = await button.isEnabled();
    assert.strictEqual(isButtonDisabled, true, 'Кнопка активна, ожидалось, что она будет неактивной.');
  });

it('проверка CIM. список проектов', async function () {
    await sleep(3000);
    let btnList1Activ = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
    let beforeClickColor = await btnList1Activ.getCssValue('background-color');
    let btnList = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]")).click();
    let afterClickColor = await btnList1Activ.getCssValue('background-color');
    assert.notEqual(beforeClickColor, afterClickColor, 'заливка фона кнопки не изменилась после нажатия');
});

it('проверка CIM. выбор первого проектa', async function () {
    await sleep(3000);
    let btnList1 = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
    btnList1 = await btnList1.getText();
    let btnQobjec = await driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
    await sleep(2000);
    let projectInTitle = await driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
    projectInTitle = await projectInTitle.getText();
    assert.equal(btnList1, projectInTitle);
    await driver.navigate().back();
});

it('проверка CIM. выбор второго проекта', async function () {
    await sleep(3000);
    let btnList2 = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[2]"));
    let btnListText = await btnList2.getText();
    btnList2.click();
    let btnQobj = await driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
    let projectInTitl = await driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
    projectInTitl = await projectInTitl.getText();
    assert.equal(btnListText, projectInTitl);
});