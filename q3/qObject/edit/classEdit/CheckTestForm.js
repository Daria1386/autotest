import Utils from '../../../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class SubstationCheck {
    constructor(driver) {
        this.driver = driver;
    }

    async checkSubstationInfo() {
        await Utils.sleep(4000);

        const open = await this.driver.findElement(By.xpath('//tr[contains(., "Дарья тест")]/td[9]/div/a'));
        await open.click();

        const openEdit = await this.driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/div[1]/a[1]/span/i'));
        await openEdit.click();

        await Utils.sleep(4000);

        const nameSubstation = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[1]/td[2]')).getText();
        let nameForm = await this.driver.findElement(By.id('name'));
        nameForm = await nameForm.getAttribute('value');
        assert.equal(nameSubstation, nameForm, 'Диспетчерское наименование подстанции не совпадает');

        const typeSubstation = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[2]/td[2]')).getText();
        const typeFormElement = await this.driver.findElement(By.xpath('//*[@id="fk_substation_type"]/option[@selected]'));
        const typeFormText = (await typeFormElement.getText()).trim();
        assert.match(typeSubstation, new RegExp(typeFormText), 'Тип подстанции не совпадает');

        let voltSubstation = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[6]/td[2]')).getText();
        let voltForm = await this.driver.findElement(By.xpath('//*[@id="fk_base_voltage"]/option[@selected]'));
        const voltFormText = (await voltForm.getText()).trim();
        assert.match(voltSubstation, new RegExp(voltFormText), 'Высшее напряжение не совпадает');

        let semanticName = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[7]/td[2]')).getText();
        let semanticForm = await this.driver.findElement(By.id('semantic_id'));
        semanticForm = await semanticForm.getAttribute('value');
        assert.equal(semanticName, semanticForm, 'Семантический идентификатор не совпадает');

        let mrid = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[8]/td[2]')).getText();
        let mridForm = await this.driver.findElement(By.id('mrid'));
        mridForm = await mridForm.getAttribute('value');
        assert.equal(mrid, mridForm, 'mRID не совпадает');

        let codTM = await this.driver.findElement(By.xpath('//*[@id="111a37dc-1d99-4054-a420-2da1c37e3b0d"]/table/tbody/tr[9]/td[2]')).getText();
        let codTMForm = await this.driver.findElement(By.id('code_tm'));
        codTMForm = await codTMForm.getAttribute('value');
        assert.equal(codTM, codTMForm, 'Код ТМ не совпадает');

        const btnClose = await this.driver.findElement(By.xpath('/html/body/div[4]/div[1]/a/span'));
        await btnClose.click();
    }
}

export default SubstationCheck;
