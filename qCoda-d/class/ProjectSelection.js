import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Utils from '../../Helpers/Utils.js';

class ProjectSelector {
    constructor(driver) {
        this.driver = driver;
    }

    async selectProject() {
        await Utils.sleep(2000);

        const select = await this.driver.findElement(By.id("projects"));
        await select.click();

        const project = await this.driver.findElement(By.xpath('//*[@id="projects"]/option[18]'));
        const projectNameText = await project.getText();
        await project.click();

        await Utils.sleep(2000);

        let newName = await this.driver.findElement(By.xpath('//*[@id="projects"]/option[@selected]'));
        const newNameText = await newName.getText();

        assert.equal(projectNameText, newNameText, 'Проект не соответствует выбранному');
    }
}

export default ProjectSelector;