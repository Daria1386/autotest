import Utils from '../../Helpers/Utils.js';
import { By } from 'selenium-webdriver';
import { strict as assert } from 'assert';

    class Auth {
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
            this.error = await this.driver.findElement(By.id("error"));
        }

        async checkUserNotFound(){
            await Utils.sleep(2000);
            await this.init();
            this.elementLogin.sendKeys(this.user.login+'b');
            this.elementPwd.sendKeys(this.user.password);
            const button = await this.driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
            await Utils.sleep(1000);
            let errorAll = await this.error.getText();
            await Utils.sleep(1000);
            assert.equal("Пользователь не найден", errorAll);
        }

        async checkPasswordWrong(){
            await Utils.sleep(2000);
            await this.init();
            this.elementLogin.sendKeys(this.user.login);
            this.elementPwd.sendKeys(this.user.password.slice(-3));
            const button = await this.driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
            await Utils.sleep(1000);
            let errorPassword = await this.error.getText();
            await Utils.sleep(1000);
            assert.equal("Пароль не верен", errorPassword);
        }

        async authorization(){    
            await Utils.sleep(3000);
            await this.init();
            this.elementLogin.clear();
            this.elementLogin.sendKeys(this.user.login);
            this.elementPwd.sendKeys(this.user.password);
            const button = await this.driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
            await Utils.sleep(5000);
            const titleQuaSy = await this.driver.findElement(By.xpath("/html/body/div[1]/h2/a"));
            assert.equal("QuaSy :: Systems", await titleQuaSy.getText());
        }
    }

    export default Auth;
