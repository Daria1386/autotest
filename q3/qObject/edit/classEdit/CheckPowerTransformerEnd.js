import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class PowerTransformerEndCheck {
    constructor(driver) {
        this.driver = driver;
    }

    async checkPowerTransformerEnd() {
        await Utils.sleep(4000);

        const open = await this.driver.findElement(By.xpath('//tr[contains(., "Дарья тест")]/td[9]/div/a'));
        await open.click();

        await Utils.sleep(2000);

        const openInfo = await this.driver.findElement(By.xpath('//*[@id="ed34ee02-5a17-4c58-83d5-cffbaf298b29"]/div[1]/div[1]/div[1]'));
        await openInfo.click();

        await Utils.sleep(2000);

        const openInfoPT = await this.driver.findElement(By.xpath('//*[@id="9be7aa34-4ab3-49b9-8416-96d83160ad75"]/div/div[1]/div[1]/div[1]'));
        await openInfoPT.click();

        await Utils.sleep(2000);

        const openEdit = await this.driver.findElement(By.xpath('//*[@id="9be7aa34-4ab3-49b9-8416-96d83160ad75"]/div/div[1]/div[1]/div[2]/a[1]/span'));
        await openEdit.click();

        await Utils.sleep(2000);

        const name = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[1]/td[2]')).getText();
        let nameForm = await this.driver.findElement(By.id('name'));
        nameForm = await nameForm.getAttribute('value');
        assert.equal(name, nameForm, 'Диспетчерское наименование не совпадает');

        let volt = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[4]/td[2]')).getText();
        let voltForm = await this.driver.findElement(By.xpath('//*[@id="fk_base_voltage"]/option[@selected]'));
        const voltFormText = (await voltForm.getText()).trim();
        assert.match(volt, new RegExp(voltFormText), 'Номинальное напряжение не совпадает');

        let semanticName = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[2]/td[2]')).getText();
        let semanticForm = await this.driver.findElement(By.id('semantic_id'));
        semanticForm = await semanticForm.getAttribute('value');
        assert.equal(semanticName, semanticForm, 'Семантический идентификатор не совпадает');

        let mrid = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[3]/td[2]')).getText();
        let mridForm = await this.driver.findElement(By.id('mrid'));
        mridForm = await mridForm.getAttribute('value');
        assert.equal(mrid, mridForm, 'mRID не совпадает');

        let connectionDiagram = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[6]/td[2]')).getText();
        let connectionDiagramForm = await this.driver.findElement(By.xpath('//*[@id="fk_winding_connection"]/option[@selected]'));
        connectionDiagramForm = await connectionDiagramForm.getAttribute('text');
        assert.equal(connectionDiagram, connectionDiagramForm, 'Схема соединения не совпадает');

        let neutralПrounding = await this.driver.findElement(By.xpath('//*[@id="a095977e-fce0-49da-9b56-d4235ed5e519"]/div/table/tbody/tr[11]/td[2]')).getText();
        let neutralПroundingForm = await this.driver.findElement(By.xpath('//*[@id="grounded"]/option[@selected]'));
        neutralПroundingForm = await neutralПroundingForm.getAttribute('text');
        assert.equal(neutralПrounding, neutralПroundingForm, 'Заземление нейтрали не совпадает');

        const btnClose = await this.driver.findElement(By.xpath('/html/body/div[4]/div[1]/a/span'));
        await btnClose.click();
    }
}

export default PowerTransformerEndCheck;
