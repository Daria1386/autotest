async function changePage(pageNumber, recordsPerPage) {
    await sleep(2000);
    const pageElement = await driver.findElement(By.xpath('//span/a[text()="' + pageNumber + '"]'));
    await pageElement.click();
    const startingRecord = (pageNumber - 1) * recordsPerPage + 1;
    const endingRecord = pageNumber * recordsPerPage;
    await sleep(2000);
    const recordsInfoPage = await driver.findElement(By.id('table_info')).getText();
    const numberOfRecords = 'Записи с ' + startingRecord + ' по ' + endingRecord + '';
    assert.ok(recordsInfoPage.includes(numberOfRecords), 'Неправильное количество записей на странице');
}
     
it('тест смены количества записей и страниц', async function () {
    await sleep(2000);
    await selectRecordsPage('25');
  
    await sleep(2000);
    await changePage(2, 25);
});