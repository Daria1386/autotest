    import Utils from '../../../../Helpers/Utils.js';
    import { By } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

    class CheckNetworkList {
        constructor(driver) {
            this.driver = driver;
        }
    
        async selectNetwork(network) {
            await Utils.sleep(3000);
            const btnNetwork = await this.driver.findElement(By.id("networks-list")).click();
            const networkValue = await this.driver.findElement(By.xpath('//*[@id="networks-list"]/option[contains(text(),"' + network + '")]'));
            const networkText = await networkValue.getText('value');
            await networkValue.click();
            await Utils.sleep(2000);
            const btnOpen = await this.driver.findElement(By.xpath('//*[@id="substations-list"]/tbody/tr[1]/td[9]/div/a')).click();
            const btnEdit = await this.driver.findElement(By.xpath('//*[@id="substn_info"]/div/div[1]/div[1]/a[1]/span/i')).click();
            await Utils.sleep(2000);
            const seti = await this.driver.findElement(By.id("fk_substation_mrid_0_text")).getAttribute('value');
            assert.equal(networkText, seti, 'Выбранная сеть не соответствует ожидаемой');
            await this.driver.navigate().back();
        }
    
        async refreshNetwork(networkFresh) {
            await Utils.sleep(3000);
            const btnNetwork = await this.driver.findElement(By.id("networks-list")).click();
            const networkOld = await this.driver.findElement(By.xpath('//*[@id="networks-list"]/option[contains(text(),"' + networkFresh + '")]'));
            const networkText = await networkOld.getText();
            await networkOld.click();
            await this.driver.navigate().refresh(); // обновляем страницу
            await Utils.sleep(3000);
            const newValue = await this.driver.findElement(By.xpath('//*[@id="networks-list"]/option[@selected]')).getText();
            assert.equal(networkText, newValue, 'После обновления страницы сеть не изменилась');
        }
    }

    export default CheckNetworkList;


/*
    it('проверка типа-сети', async function () {
        await sleep(2000);
        await selectNetwork('Московский РЭС');
    });

    it('выбор типа подстанции', async function () {
        await sleep(2000);
        await refreshNetwork('Московский РЭС');
    });
*/