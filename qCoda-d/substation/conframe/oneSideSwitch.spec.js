it('переключение выкатной тележки', async function () {
    await sleep(2000);
    const switching = await driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
    // Выполнение действий для включения или отключения оборудования
    const currentStateSelect = await driver.findElement(By.id('current_state_prop'));
    const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
    const currentStateValue = await currentStateOption.getAttribute('value');
    // Определение, какое действие нужно выполнить
    let actionOptionIndex;
        if ((currentStateValue === 'WORKING')) { // Рабочее положение
            actionOptionIndex = 2;
        } else if ((currentStateValue === 'REPAIR')) {  // Ремонтное положение
            actionOptionIndex = 3;
        }  else if ((currentStateValue === 'CONTROL')) {  // Контрольное положение
            actionOptionIndex = 1;
        }
    // Выбор нужного действия
    const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`)).click();
    const checkbox = await driver.findElement(By.id('confirm_change_status_checked')).click();
    const execute = await driver.findElement(By.id('set_change_status_element')).click();
    await sleep(2000);
    // Проверка состояния оборудования
    const MRID = '9d044fa4-34ab-3d0a-4bfc-c3406cc340de';
    const position = await driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[@display='none']`));
    if (position.length === 6) {
            console.log('Переведено в рабочее положение');
        } else if(position.length === 5) {
            console.log('Переведено в ремонтное положение');
        } else if(position.length === 3){
            console.log('Переведено в контрольное положение');
        }
});
