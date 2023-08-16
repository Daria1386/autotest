it('проверка пагинации', async function () {
    await sleep(2000);
    const nextPageButton = await driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[2]'));
    let initialRecordsInfo = await driver.findElement(By.id('table_info')).getText();
    await nextPageButton.click();
    await sleep(2000);
    let currentPageRecordsInfo = await driver.findElement(By.id('table_info')).getText();
    assert.notEqual(initialRecordsInfo, currentPageRecordsInfo, 'Количество записей на 2 странице такое же, как и на начальной странице');
    const secondNextPageButton = await driver.findElement(By.xpath('//*[@id="table_paginate"]/span/a[3]'));
    await secondNextPageButton.click();
    await sleep(2000);
    let newCurrentPageRecordsInfo = await driver.findElement(By.id('table_info')).getText();
    assert.notEqual(currentPageRecordsInfo, newCurrentPageRecordsInfo, 'Количество записей на 3 странице такое же, как и на начальной странице');
});