import Utils from '../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class Login {
    user={
        "login":"abcd",
        "password":'abcd'
    };

    constructor(driver){
        this.driver = driver
    }

    async init(){
        this.elementLogin = await this.driver.findElement(By.id("login"));           
        this.elementPwd = await this.driver.findElement(By.id("pwd"));
    }

    async authorization(){    
        await Utils.sleep(3000);
        await this.init();
        this.elementLogin.sendKeys(this.user.login);
        this.elementPwd.sendKeys(this.user.password);
        const button = await this.driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await Utils.sleep(5000);
        const titleQuaSy = await this.driver.findElement(By.xpath("/html/body/div[1]/div/div/div"));
        assert.equal('Не выбран проект!', await titleQuaSy.getText());
    }
}

export default Login;