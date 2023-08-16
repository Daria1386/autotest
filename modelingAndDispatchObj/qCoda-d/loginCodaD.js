import Utils from '../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

class Login {
    user={
        "login":"",
        "password":''
    };

    constructor(driver){
        this.driver = driver
    }

    async authorization(){    
        await Utils.sleep(3000);
        await this.init();
        this.elementLogin.sendKeys(this.user.login);
        this.elementPwd.sendKeys(this.user.password);
        const button = await this.driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await Utils.sleep(3000);
        const titleQuaSy = await this.driver.findElement(By.xpath("/html/body/div[1]/h2/a"));
        assert.equal("QuaSy :: Systems", await titleQuaSy.getText());
    }
}

export default Login;