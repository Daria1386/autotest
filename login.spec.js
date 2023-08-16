import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

    describe('First script', function () {
        let driver;
            before(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
            });

            after(async () => await driver.quit()); //закрытие окна после завершения тестов

            it('First Selenium script', async function () {
            await driver.get('http://dunlin.dunrose.local/security/login.php?path=/q3/');

            let title = await driver.getTitle();
            assert.equal("Авторизация в системе СППР", title);
            });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        };

    it('правильный логин и неправильный пароль', async function () {
        await sleep(2000);
        let login = await driver.findElement(By.id("login")).sendKeys("DKargapolova");
        let passwordWrong = await driver.findElement(By.id("pwd")).sendKeys("Abcd12345");
        let btnEnt = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        let errorPassword = await driver.findElement(By.id("error")).getText();
        await sleep(2000);
        assert.equal("Пароль не верен", errorPassword);
    });

    it('неправильный логин и пароль', async function () {
        await sleep(2000);
        let loginWrong = await driver.findElement(By.id("login")).sendKeys("DKargapolov");
        let passwordWron = await driver.findElement(By.id("pwd")).sendKeys("Abcd12345");
        let btnEnter = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        let errorAll = await driver.findElement(By.id("error")).getText();
        await sleep(2000);
        assert.equal("Пользователь не найден", errorAll);
    });

    it('правильный логин и пароль', async function () {
        await sleep(3000);
        const login = await driver.findElement(By.id("login")).sendKeys("DKargapolova");
        const password = await driver.findElement(By.id("pwd")).sendKeys("Abcd12345#");
        const btnEntrance = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await sleep(3000);
        const titleQuaSy = await driver.findElement(By.xpath("/html/body/div[1]/h2/a"));
        assert.equal("QuaSy :: Systems", await titleQuaSy.getText());
    });
})