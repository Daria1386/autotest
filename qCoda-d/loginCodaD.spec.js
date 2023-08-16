import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
    import { strict as assert } from 'assert';

describe('First script', function () {
        let driver;

            before(async function () {
            driver = await new Builder().forBrowser('chrome').build();
            await driver.manage().window().maximize();
            });

            //after(async () => await driver.quit());

            it('First Selenium script', async function () {
            await driver.get('http://dunlin.dunrose.local/security/login.php?path=/qcoda-d/');

            let title = await driver.getTitle();
            assert.equal("Авторизация в системе СППР", title);
                

            });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        };

    it('правильный логин и пароль', async function () {
        await sleep(3000);
        const login = await driver.findElement(By.id("login")).sendKeys("ruban321");
        const password = await driver.findElement(By.id("pwd")).sendKeys("123");
        const btnEntrance = await driver.findElement(By.xpath("//button[@id='launchbtn']")).click();
        await sleep(3000);
        const qCoda = await driver.getTitle();
        assert.equal("qCODA_D", qCoda, 'Страница не соответствует ожидаемой');
    });
})