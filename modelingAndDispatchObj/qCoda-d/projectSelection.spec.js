it('выбор рабочего проекта', async function () {
    await sleep(3000);
    const select = await driver.findElement(By.id("projects")).click();
    const prodject = await driver.findElement(By.xpath('//*[@id="projects"]/option[18]'));
    const prodjectNameText = await prodject.getText();
    await prodject.click();
    await sleep(2000);
    let newName = await driver.findElement(By.xpath('//*[@id="projects"]/option[@selected]'));
    const newNameText = await newName.getText();
    assert.equal(prodjectNameText, newNameText,'Проект не соответствует выбранному');
});