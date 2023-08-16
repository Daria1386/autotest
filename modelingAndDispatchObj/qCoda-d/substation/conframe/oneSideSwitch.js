import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../Helpers/Utils.js';

class OneSideSwitch {
    constructor(driver) {
        this.driver = driver;
    }

    async switchOneSide(MRID) {
        await Utils.sleep(2000);

        const switching = await this.driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
        // Выполнение действий для включения или отключения оборудования
        const currentStateSelect = await this.driver.findElement(By.id('current_state_prop'));
        const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
        const currentStateValue = await currentStateOption.getAttribute('value');
        // Определение, какое действие нужно выполнить
        let actionOptionIndex;
        if (currentStateValue === 'WORKING') { // Рабочее положение
            actionOptionIndex = 2;
        } else if (currentStateValue === 'REPAIR') {  // Ремонтное положение
            actionOptionIndex = 3;
        } else if (currentStateValue === 'CONTROL') {  // Контрольное положение
            actionOptionIndex = 1;
        }
        // Выбор нужного действия
        const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`));
        await actionOption.click();
        const checkbox = await this.driver.findElement(By.id('confirm_change_status_checked')).click();
        const execute = await this.driver.findElement(By.id('set_change_status_element')).click();
        await Utils.sleep(2000);
        // Проверка состояния оборудования
        const position = await this.driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[@display='none']`));
        if (position.length === 6) {
            console.log('Переведено в рабочее положение');
        } else if (position.length === 5) {
            console.log('Переведено в ремонтное положение');
        } else if (position.length === 3) {
            console.log('Переведено в контрольное положение');
        }
    }
}

export default OneSideSwitch;

/*
    it('переключение one side', async function () {
        await sleep(2000);
        await switchDisconnector('9d044fa4-34ab-3d0a-4bfc-c3406cc340de');
    });
*/