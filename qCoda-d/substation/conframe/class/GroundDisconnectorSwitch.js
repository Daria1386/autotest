import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../../../Helpers/Utils.js';

class GroundDisconnectorSwitch {
    constructor(driver) {
        this.driver = driver;
    }

    async switchDisconnector(MRID) {
        await Utils.sleep(2000);

        const switching = await this.driver.findElement(By.xpath('//*[@id="pop_up_window_div"]/li[3]')).click();
        // Выполнение действий для включения или отключения оборудования
        const currentStateSelect = await this.driver.findElement(By.id('current_state_prop'));
        const currentStateOption = await currentStateSelect.findElement(By.css('option[selected]'));
        const currentStateValue = await currentStateOption.getAttribute('value');
        // Определение, какое действие нужно выполнить
        let actionOptionIndex;
        if (currentStateValue === 'OPENED') {
            // Оборудование включено
            actionOptionIndex = 1;
        } else if (currentStateValue === 'CLOSED') {
            // Оборудование выключено
            actionOptionIndex = 2;
        }
        // Выбор нужного действия
        const actionOption = await currentStateSelect.findElement(By.xpath(`//*[@id="current_state_prop"]/option[${actionOptionIndex}]`));
        await actionOption.click();
        const checkbox = await this.driver.findElement(By.id('confirm_change_status_checked')).click();
        const time = await this.driver.findElement(By.xpath('//*[@id="not_cheked_tele_control"]/div/div[2]/button')).click();
        const execute = await this.driver.findElement(By.id('set_change_status_element')).click();
        await Utils.sleep(2000);
        // Проверка состояния оборудования
        const btnOn = await this.driver.findElements(By.xpath(`//*[local-name()='svg' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg']/*[local-name()='g' and namespace-uri()='http://www.w3.org/2000/svg'][@dev_mrid='${MRID}']/*[local-name()='rect'][@display='none']`));
        if (btnOn.length > 0) {
            console.log('Оборудование включено');
        } else {
            console.log('Оборудование выключено');
        }
    }
}

export default GroundDisconnectorSwitch;

/*
    it('переключение Disconnector', async function () {
        await sleep(2000);
        await switchDisconnector('№ MRID');
    });
*/