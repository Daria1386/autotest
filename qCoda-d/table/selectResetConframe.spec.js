    async function typeConFrame(ConFrame) {
        const btnSelectName = await driver.findElement(By.xpath(`//*[@id="column_select_search_5"]/option[contains(text(),"${ConFrame}")]`));
        const oldType = await btnSelectName.getText();
        await btnSelectName.click();

        await driver.wait(until.elementIsEnabled(driver.switchTo().activeElement()));
        await driver.switchTo().activeElement().sendKeys(Key.ENTER);
        await sleep(3000);
        
        const selectConFrameNew = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.equal(oldType, selectConFrameNew, 'Тип ConFrame не соответствует выбранному');
    }

    it('выбор ConFrame', async function () {
        await sleep(2000);
        await typeConFrame('Топологическая модель');
    });

    it('сброс фильтра ConFrame', async function () {
        await sleep(2000);
        const oldType = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        let clineSubstation = await driver.findElement(By.xpath('//*[@id="column_select_search_5"]/option[1]')).click();
        await sleep(2000);
        const newType = await driver.findElement(By.xpath('//*[@id="table"]/tbody/tr[1]/td[4]')).getText();
        assert.notEqual(oldType, newType, 'Фильтр ConFrame не сбросился');
    });