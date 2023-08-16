it('проверка тестовой формы', async function () {
    await sleep(2000);
    const open = await driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/a')).click();
    const openEdit = await driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/div[1]/a[1]/span/i')).click();
    await sleep(2000);

    const nameSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[1]/td[2]')).getText();
    let nameForm = await driver.findElement(By.id('name'));
    nameForm = await nameForm.getAttribute('value');
    assert.equal(nameSubstation, nameForm, 'Диспетчерское наименование подстанции не совпадает');

    const typeSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[2]/td[2]')).getText();
    const typeFormElement = await driver.findElement(By.xpath('//*[@id="fk_substation_type"]/option[@selected]'));
    const typeFormText = (await typeFormElement.getText()).trim();
    assert.match(typeSubstation, new RegExp(typeFormText), 'Тип подстанции не совпадает');

    let voltSubstation = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[6]/td[2]')).getText();
    let voltForm = await driver.findElement(By.xpath('//*[@id="fk_base_voltage"]/option[@selected]'));
    const voltFormText = (await voltForm.getText()).trim();
    assert.match(voltSubstation, new RegExp(voltFormText), 'Высшее напряжение не совпадает');

    let semanticName = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[7]/td[2]')).getText();
    let semanticForm = await driver.findElement(By.id('semantic_id'));
    semanticForm = await semanticForm.getAttribute('value');
    assert.equal(semanticName, semanticForm, 'Семантический идентификатор не совпадает');

    let mrid = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[8]/td[2]')).getText();
    let mridForm = await driver.findElement(By.id('mrid'));
    mridForm = await mridForm.getAttribute('value');
    assert.equal(mrid, mridForm, 'mRID не совпадает');

    let codTM = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[9]/td[2]')).getText();
    let codTMForm = await driver.findElement(By.id('code_tm'));
    codTMForm = await codTMForm.getAttribute('value');
    assert.equal(codTM, codTMForm, 'Код ТМ не совпадает');

    let conframe = await driver.findElement(By.xpath('//*[@id="968aae6b-631e-4183-8527-94ae01c4389b"]/table/tbody/tr[10]/td[2]/span[1]')).getText();
    let conframeForm = await driver.findElement(By.id('conframe_id_text'));
    conframeForm = await conframeForm.getAttribute('value');
    assert.equal(conframe, conframeForm, 'ConFrame не совпадает');

    const btnClose = await driver.findElement(By.xpath('/html/body/div[4]/div[1]/a/span')).click();
});