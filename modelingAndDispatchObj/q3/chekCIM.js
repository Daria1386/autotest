    import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
    import { strict as assert } from 'assert';
    import Utils from '../Helpers/Utils.js';

    class ChekCIM {
        constructor(driver) {
            this.driver = driver
        }

        async checkInactiveButton() {
            await Utils.sleep(2000);
            const button = await this.driver.findElement(By.xpath('//a[contains(@class, "btn-warning")]'));
            await this.driver.wait(until.elementIsEnabled(button), 5000);
            const isButtonDisabled = await button.isEnabled();
            assert.strictEqual(isButtonDisabled, true, 'Кнопка активна, ожидалось, что она будет неактивной.');
        }

        async checkButtonColorChange() {
            await Utils.sleep(3000);
            let btnList1Activ = await this.driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
            let beforeClickColor = await btnList1Activ.getCssValue('background-color');
            await btnList1Activ.click();
            let afterClickColor = await btnList1Activ.getCssValue('background-color');
            assert.notEqual(beforeClickColor, afterClickColor, 'заливка фона кнопки не изменилась после нажатия');
        }

        async checkSelectFirstProject() {
            await Utils.sleep(3000);
            let btnList1 = await this.driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[1]"));
            btnList1 = await btnList1.getText();
            await this.driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
            await Utils.sleep(2000);
            let projectInTitle = await this.driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
            projectInTitle = await projectInTitle.getText();
            assert.equal(btnList1, projectInTitle);
            await this.driver.navigate().back();
        }

        async checkSelectSecondProject() {
            await Utils.sleep(3000);
            let btnList2 = await this.driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[2]"));
            let btnListText = await btnList2.getText();
            await btnList2.click();
            await this.driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/div[2]/a[2]")).click();
            let projectInTitle = await this.driver.findElement(By.xpath('//*[@id="projects-list"]/option[@selected]'));
            projectInTitle = await projectInTitle.getText();
            assert.equal(btnListText, projectInTitle);
        }
    }

    export default ChekCIM;
