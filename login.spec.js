    const {By, Builder, Browser} = require('selenium-webdriver');
    const {suite} = require('selenium-webdriver/testing');
    const assert = require("assert");

    suite(function (env) {
        describe('First script', function () {
        let driver;

            before(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            });

            after(async () => await driver.quit());

            it('First Selenium script', async function () {
            await driver.get('http://dunlin.dunrose.local/security/login.php?path=/q3/');

            let title = await driver.getTitle();
            assert.equal("Авторизация в системе СППР", title);

            });
        });

    it('правильный логин и пароль', async function () {
        await sleep(2000);
        await driver.findElement(By.id("login")).sendKeys("DKargapolova");
        await driver.findElement(By.id("pwd")).sendKeys("Abcd12345#");
        await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        assert.equal("Авторизация в системе СППР", title);
    });

    }, { browsers: [Browser.CHROME, Browser.FIREFOX]});