import { By, Builder, Browser, until, Key } from 'selenium-webdriver';
import { strict as assert } from 'assert';
import Auth from '../Auth/Auth.js';

describe('First script', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    after(async () => await driver.quit()); //закрытие окна после завершения тестов

    it('First Selenium script', async function () {
        await driver.get('http://dunlin.dunrose.local/q3/qconframe/typical_element/openRepository/project/54');

        let title = await driver.getTitle();
        assert.equal("Авторизация в системе СППР", title);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    it('правильный логин и пароль', async function () {
        let login = new Auth(driver);
        await login.authorization();
    });

    it('открытие qconframe', async function () {
        await sleep(3000);
        let btnList2 = await driver.findElement(By.xpath("/html/body/div[2]/div[1]/div/div[2]/button[2]"));
        btnList2.click();
        await sleep(3000);
        await driver.get('http://dunlin.dunrose.local/q3/qconframe/typical_element/openRepository/project/54');
    });

    async function processTab(tab, id){
        await sleep(4000);
        const btnBreaker = await driver.findElement(By.xpath('//*[@id="' + tab + '"]/a')).click();
        await sleep(2000);
        const recordCange = await driver.findElement(By.xpath('//*[@id="example_length"]/label/select/option[4]')).click();
        await sleep(2000);
        const changeBreaker = await driver.findElement(By.xpath('//*[@id="'+id+'"]/button[1]')).click();

        const windowTypicalElem = await driver.getWindowHandle();
        const windowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = windowHandles.find(handle => handle !== windowTypicalElem);
        await driver.switchTo().window(newWindowHandle);
        await sleep(4000);

        const btnFile = await driver.findElement(By.xpath('//*[@id="menu_div"]/div/div[1]/button')).click();
        const btnSave = await driver.findElement(By.xpath('//*[@id="sm_btn_save"]/a')).click();
        await sleep(2000);
        const massedgeSave = await driver.findElement(By.id('cfe_alert_div_1')).getText();
        assert.equal('Сохранено', massedgeSave);
        
        await driver.close();
        await driver.switchTo().window(windowTypicalElem);
    }

    it('проверка типовых элементов Выключатель', async function () {
        await processTab('breaker', '15091483753095', 'Выключатель');
        await processTab('breaker', '16081757191753', 'Автоматический выключател');
    });

    it('проверка типовых элементов Выключатель нагрузки', async function () {
        await processTab('load_break_switch', '17031030311888');
    });

    it('проверка типовых элементов Высокочастотный заградитель', async function () {
        await processTab('high_frequency_rejector', '16081534351190');
    });

    it('проверка типовых элементов Генератор', async function () {
        await processTab('generator', '16081543066794');
    });

    it('проверка типовых элементов Датчик', async function () {
        //await processTab('sensor', '');
    });

    it('проверка типовых элементов Двухсторонняя выкатная тележка', async function () {
        await processTab('double_side', '16070506281057', 'Тележка_вниз_2');
        await processTab('double_side', '16070531507179', 'Тележка_вверх_2');
    });

    it('проверка типовых элементов Динамический элемент', async function () {
        await processTab('DYNAMIC_ELEMENT', '17042637130870');
    });

    it('проверка типовых элементов Дугогасительная катушка', async function () {
        await processTab('petersen_coil', '17073168150329', 'ДГР');
        await processTab('petersen_coil', '17102320436691', 'ДГР+ТТ');
        await processTab('petersen_coil', '18031631290175', 'ДГР с РПН');
    });

    it('проверка типовых элементов Заземление', async function () {
        await processTab('ground', '17083060698063');
    });

    it('проверка типовых элементов Заземляющее сопротивлени', async function () {
        await processTab('grounding_impedance', '23051187990191');
    });

    it('проверка типовых элементов Заземляющий нож / Короткозамыкатель', async function () {
        await processTab('ground_disconnector', '16081519120253', 'Заземляющий нож');
        await processTab('ground_disconnector', '16081579526969', 'Короткозамыкатель');
    });

    it('проверка типовых элементов Заземляющий реактор', async function () {
        await processTab('shunt_compensator', '16081550827292');
    });

    it('проверка типовых элементов Источник питания', async function () {
        await processTab('energy_source', '17072464051119');
    });

    it('проверка типовых элементов Конденсатор', async function () {
        await processTab('capacitor', '16081512242582', 'Конденсатор');
        await processTab('capacitor', '17103123100081', 'УКРМ');
        await processTab('capacitor', '19021300913015', 'БСК');
    });

    it('проверка типовых элементов Линейное шунтирующее компенсирующее устройство', async function () {
        //await processTab('linear_shunt_compensator', '');
    });

    it('проверка типовых элементов Линейный ввод', async function () {
        await processTab('line_entry', '16081513211127', 'Линейный ввод');
        await processTab('line_entry', '19021832283732', 'Линейный ввод_ТП_РЭС_абонентская');
        await processTab('line_entry', '19021890935879', 'Линейный ввод_ТП_РЭС');
    });

    it('проверка типовых элементов Нагрузка', async function () {
        await processTab('energy_consumer', '16081512158192');
    });

    it('проверка типовых элементов Нелинейное шунтирующее компенсирующее устройство', async function () {
        //await processTab('nonlinear_shunt_compensator', '');
    });

    it('проверка типовых элементов Обмотка трансформатора 1-5', async function () {
        await processTab('power_transformer_end', '15092338339275', 'Обмотка_Y_AT_РПН');
        await processTab('power_transformer_end', '15092369007842', 'Обмотка_Y_AT');
        await processTab('power_transformer_end', '16081519958299', 'Обмотка_АТ');
        await processTab('power_transformer_end', '16081521652647', 'Обмотка_Y');
        await processTab('power_transformer_end', '16081530340019', 'Обмотка_Yn_AT');
    });

    it('проверка типовых элементов Обмотка трансформатора 6-10', async function () {
        await processTab('power_transformer_end', '16081564910122', 'Обмотка_D');
        await processTab('power_transformer_end', '16081567308167', 'Обмотка_Yn_AT_РПН (правое подключение)');
        await processTab('power_transformer_end', '16081568364775', 'Обмотка_Y_РПН');
        await processTab('power_transformer_end', '16081572908093', 'Обмотка_Dn');
        await processTab('power_transformer_end', '16081577414594', 'Обмотка_Yn');
    });

    it('проверка типовых элементов Обмотка трансформатора 11-15', async function () {
        await processTab('power_transformer_end', '16081597883201', 'Обмотка_Yn_AT_РПН');
        await processTab('power_transformer_end', '16081663755110', 'Обмотка_Yn_AT (правое подключение)');
        await processTab('power_transformer_end', '16081720386266', 'Обмотка_Yn_РПН');
        await processTab('power_transformer_end', '16111773675884', 'Обмотка_Без схемы подключения');
        await processTab('power_transformer_end', '17020399409429', 'Обмотка_Zn');
    });

    it('проверка типовых элементов Обмотка трансформатора 16-20', async function () {
        await processTab('power_transformer_end', '17031477546167', 'Обмотка_Yn_AT_РПН_2');
        await processTab('power_transformer_end', '17062203449281', 'ТП');
        await processTab('power_transformer_end', '17062607018115', 'ТП_полукруг_правый');
        await processTab('power_transformer_end', '17062655133524', 'ТП_полукруг_левый');
        await processTab('power_transformer_end', '17081609735880', 'Обмотка_Y_(правое подключение)');
    });

    it('проверка типовых элементов Обмотка трансформатора 21-25', async function () {
        await processTab('power_transformer_end', '17103057009839', 'Обмотка_D (Среднее подключение)');
        await processTab('power_transformer_end', '17103062375859', 'Обмотка_D (Левое подключение)');
        await processTab('power_transformer_end', '17103067269149', 'Обмотка_Y_(левое подключение)');
        await processTab('power_transformer_end', '18021625892244', 'Обмотка_AT_РПН');
        await processTab('power_transformer_end', '18111360788227', 'ТП_РЭС');
    });

    it('проверка типовых элементов Обмотка трансформатора 26-30', async function () {
        await processTab('power_transformer_end', '18111408356410', 'ТП_РЭС_полукруг правый');
        await processTab('power_transformer_end', '18111416789932', 'ТП_РЭС_полукруг левый');
        await processTab('power_transformer_end', '18111460659239', 'ТП_РЭС_абонентская');
        await processTab('power_transformer_end', '18111499091975', 'ТП_РЭС_полукруг левый_2');
        await processTab('power_transformer_end', '19012254594257', 'Обмотка Yn - РПН');
    });

    it('проверка типовых элементов Обмотка трансформатора 31-35', async function () {
        await processTab('power_transformer_end', '19012256409412', 'Звезда с нулем');
        await processTab('power_transformer_end', '19013033310813', 'Y_с нулем и РПН');
        await processTab('power_transformer_end', '19021854590606', 'Обмотка_D_AT_РПН');
        await processTab('power_transformer_end', '19021872336337', 'РПН трансформатора с обмоткой D');
        await processTab('power_transformer_end', '19021900478894', 'Обмотка_Y_третий терминал на обмотке_левый');
    });

    it('проверка типовых элементов Обмотка трансформатора 36-40', async function () {
        await processTab('power_transformer_end', '19021916443754', 'Обмотка_Y_третий терминал на обмотке_правый');
        await processTab('power_transformer_end', '19022675184467', 'Обмотка_Z с нулём');
        await processTab('power_transformer_end', '19030504741258', 'Обмотка D с РПН');
        await processTab('power_transformer_end', '19031405184487', 'Обмотка "Разомкнутый треугольник"');
        await processTab('power_transformer_end', '19052134082945', 'Схема соединения Z');
    });

    it('проверка типовых элементов Ограничитель перенапряжения', async function () {
        await processTab('surge_protector', '16081539071725');
    });

    it('проверка типовых элементов Односторонняя выкатная тележка', async function () {
        await processTab('one_side', '16081591236044', 'Тележка_вверх_1');
        await processTab('one_side', '16081795693000', 'Тележка_вниз_1');
    });

    it('проверка типовых элементов Опора 1-5', async function () {
        await processTab('tower', '18080811221229', 'Ж/Б анкерная');
        await processTab('tower', '18080811715583', 'Ж/Б одностоечная');
        await processTab('tower', '18080828200851', 'Деревянная анкерная с Ж/Б приставкой');
        await processTab('tower', '18080852797569', 'Деревянная одностоечная с Ж/Б приставкой');
        await processTab('tower', '18081301316564', 'Металлическая');
    });

    it('проверка типовых элементов Опора 6-10', async function () {
        await processTab('tower', '18081306552588', 'Ж/Б анкерная круглая');
        await processTab('tower', '18081308470403', 'Деревянная одностоечная');
        await processTab('tower', '18081344462054', 'Деревянная анкерная');
        await processTab('tower', '18081354572731', 'Деревянная анкерная трехногая с Ж/Б приставкой');
        await processTab('tower', '18081367190945', 'Ж/Б анкерная трехногая');
    });

    it('проверка типовых элементов Опора 10-13', async function () {
        await processTab('tower', '18081383890567', 'Деревянная анкерная трехногая');
        await processTab('tower', '18081385537928', 'Ж/Б анкерная трехногая круглая');
        await processTab('tower', '18081392588611', 'Ж/Б одностоечная круглая');
    });

    it('проверка типовых элементов Перемычка', async function () {
        await processTab('jumper', '23072534896646');
    });

    it('проверка типовых элементов Плакат 1-5', async function () {
        await processTab('banner', '19121946527303', 'Работа на линии');
        await processTab('banner', '19122037158698', 'Заземлено');
        await processTab('banner', '19122043906680', 'Не включать! Работают люди');
        await processTab('banner', '19122322634079', 'Работать здесь');
        await processTab('banner', '19122329624639', 'Не открывать! работают люди');
    });

    it('проверка типовых элементов Плакат 6-10', async function () {
        await processTab('banner', '19122333446131', 'Влезать здесь');
        await processTab('banner', '19122352128562', 'Испытание, опасно для жизни');
        await processTab('banner', '19122356020939', 'Не влезай! Убьет');
        await processTab('banner', '19122378358345', 'СТОЙ! Напряжение');
        await processTab('banner', '19122388790164', 'Работа под напряжением. Повторно не включать');
    });

    it('проверка типовых элементов Плакат 11-15', async function () {
        await processTab('banner', '19122398962424', 'Осторожно! напряжение');
        await processTab('banner', '20080730330309', 'АВР,РЗ отключены по режиму');
        await processTab('banner', '20080776183952', 'АВР, РЗ отключены из-за повреждения оборудования');
        await processTab('banner', '20082805811985', '“Особенная” схема, конструкция');
        await processTab('banner', '20082809388949', 'Шунт');
    });

    it('проверка типовых элементов Плакат 16-20', async function () {
        await processTab('banner', '20082812825178', 'Повреждение');
        await processTab('banner', '20082814437233', 'Требуется заливка масла');
        await processTab('banner', '20082815277500', 'Высоковольтный двигатель');
        await processTab('banner', '20082823833734', 'Устройство отключения ввода');
        await processTab('banner', '20082829553905', 'Особая схема');
    });

    it('проверка типовых элементов Плакат 21-25', async function () {
        await processTab('banner', '20082833343336', 'Капремонт');
        await processTab('banner', '20082835594315', 'Испытание');
        await processTab('banner', '20082851338082', 'Кабель не в “фазе”');
        await processTab('banner', '20082858433109', 'Дополнительные ключи');
        await processTab('banner', '20082864524872', 'Реконструкция');
    });

    it('проверка типовых элементов Плакат 26-30', async function () {
        await processTab('banner', '20082864860376', 'Определение места повреждения');
        await processTab('banner', '20082868905237', 'Заземляющие ножи включены');
        await processTab('banner', '20082870412324', 'Трансформатор отключен');
        await processTab('banner', '20082874179897', 'Монтаж');
        await processTab('banner', '20082879809082', 'Новое включение');
    });

    it('проверка типовых элементов Плакат 31-34', async function () {
        await processTab('banner', '20082892119105', 'Генерирующий источник');
        await processTab('banner', '20082894808601', 'Диспетчерские наименования в ЭУ обновлены');
        await processTab('banner', '20121713200195', 'Транзит. Без разрешения дежурного диспетчера не включать!');
        await processTab('banner', '20121720973840', 'Деление сети. Кабель под напряжением');
    });

    it('проверка типовых элементов Плакат разделительный', async function () {
        await processTab('banner_boundary', '23071378467245');
    });

    it('проверка типовых элементов Подстанция 1-5', async function () {
        await processTab('substation', '19051703510386', 'ЗТП');
        await processTab('substation', '19051734127159', 'ПС');
        await processTab('substation', '19051740647352', 'РТП');
        await processTab('substation', '19051746992483', 'ТП абоненсткая');
        await processTab('substation', '19051756673374', 'TП');
    });

    it('проверка типовых элементов Подстанция 6-10', async function () {
        await processTab('substation', '19051781361520', 'РП');
        await processTab('substation', '19051799958621', 'МТП');
        await processTab('substation', '19052320450606', 'КТП');
        await processTab('substation', '19090206011066', 'КРУН');
        await processTab('substation', '20082611524200', 'БКТП');
    });

    it('проверка типовых элементов Подстанция 11-13', async function () {
        await processTab('substation', '20082623109937', 'БРТП');
        await processTab('substation', '20082648620332', 'БМКТП');
        await processTab('substation', '20082675139817', 'СТП');
    });

    it('проверка типовых элементов Предохранитель', async function () {
        await processTab('fuse', '16081540114190');
    });

    it('проверка типовых элементов Проводник', async function () {
        //await processTab('conductor', '');
    });

    it('проверка типовых элементов Разрядник', async function () {
        await processTab('arrester', '16081533198418', 'Разрядник');
        await processTab('arrester', '16102603179723', 'Разрядник_1');
        await processTab('arrester', '19030686418713', 'Разрядник двойной');
    });

    it('проверка типовых элементов Разъединитель / Отделитель', async function () {
        await processTab('disconnector', '16081092296815', 'Отделитель');
        await processTab('disconnector', '16081524104740', 'Разъединитель');
        await processTab('disconnector', '18031327088299', 'Три однофазных разъединителя');
    });

    it('проверка типовых элементов Регулировочный трансформатор 1-3', async function () {
        await processTab('booster_transformer', '17030135457912', 'РТ_Левый');
        await processTab('booster_transformer', '18042309153430', 'ЛРН влево');
        await processTab('booster_transformer', '19021808188266', 'РТ_Вверх');
    });

    it('проверка типовых элементов Регулировочный трансформатор 4-7', async function () {
        await processTab('booster_transformer', '19021884769366', 'РТ_Правый');
        await processTab('booster_transformer', '19021920900773', 'РТ_Вниз');
        await processTab('booster_transformer', '19032074918126', 'Вольтдобавочный трансформатор');
        await processTab('booster_transformer', '19032670590567', 'ЛТМН');
    });

    it('проверка типовых элементов Резистор', async function () {
        await processTab('resistor', '17100590849857');
    });

    it('проверка типовых элементов Реклоузер', async function () {
        await processTab('recloser', '19071633655650');
    });

    it('проверка типовых элементов Релейная защита 1-4', async function () {
        await processTab('PE_TM', '18061810616231', 'Дифференциальная защита трансформатора');
        await processTab('PE_TM', '18061844498042', 'Устройство резервирования отказов выключателей');
        await processTab('PE_TM', '18061855590418', 'Противоаварийная автоматика');
        await processTab('PE_TM', '18061856112543', 'Газовая защита');
    });

    it('проверка типовых элементов Релейная защита 5-9', async function () {
        await processTab('PE_TM', '18061866551710', 'Аварийное отключение');
        await processTab('PE_TM', '18061894877085', 'Автоматическая частотная разгрузка');
        await processTab('PE_TM', '18062005880933', 'Вывод из работы газовой защиты');
        await processTab('PE_TM', '18062011079715', 'Вывод из работы противоаварийной автоматики');
    });

    it('проверка типовых элементов Релейная защита 9-11', async function () {
        await processTab('PE_TM', '18062023389865', 'Вывод из работы УРОВ/блокировка');
        await processTab('PE_TM', '18062044105410', 'Вывод из работы ДЗТ/блокировка');
        await processTab('PE_TM', '18062090527228', 'Вывод из работы АЧР/блокировка');
    });

    it('проверка типовых элементов Силовой трансформатор', async function () {
        await processTab('power_transformer', '19041643520905');
    });

    it('проверка типовых элементов Синхронный компенсатор', async function () {
        await processTab('synchronous_machine', '19021907242580', 'Асинхронный компенсатор');
        await processTab('synchronous_machine', '19021954279204', 'Синхронный компенсатор');
    });

    it('проверка типовых элементов Стык', async function () {
        await processTab('junction', '16040713535544', 'Отпайка');
    });

    it('проверка типовых элементов Реактор токоограничивающий', async function () {
        await processTab('series_compensator', '16081554792367', 'Реактор токоограничивающий');
        await processTab('series_compensator', '16081582414849', 'Реактор токоограничивающий_Сдвоенный');
    });

    it('проверка типовых элементов Трансформатор напряжения 1-5', async function () {
        await processTab('potential_transformer', '15091673194502', 'Трансформатор напряжения измерительный с одной вторичной обмоткой');
        await processTab('potential_transformer', '16081510253752', 'Трансформатор напряжения многообмоточный_земля');
        await processTab('potential_transformer', '16081530154741', 'Трансформатор напряжения измерительный с двумя вторичными обмотками 1');
        await processTab('potential_transformer', '16081558381817', 'Трансформатор напряжения измерительный с двумя вторичными обмотками');
        await processTab('potential_transformer', '16081575547980', 'Трансформатор напряжения многообмоточный_вверх');
    });

    it('проверка типовых элементов Трансформатор напряжения 6-10', async function () {
        await processTab('potential_transformer', '16081671614233', 'Трансформатор напряжения многообмоточный');
        await processTab('potential_transformer', '16081850081442', 'Трансформатор многообмоточный_ линия');
        await processTab('potential_transformer', '16083199655520', 'Трансформатор напряжения трехобмоточный_вниз');
        await processTab('potential_transformer', '16102832861254', 'Трансформатор напряжения многообмоточный со схемами подключения');
        await processTab('potential_transformer', '17030139970652', 'Трансформатор напряжения измерительный с двумя вторичными обмотками и заземлением всех обмоток');
    });

    it('проверка типовых элементов Трансформатор напряжения 11-15', async function () {
        await processTab('potential_transformer', '17031003917444', 'Трансформатор напряжения измерительный с двумя вторичными обмотками и заземлением всех обмоток_вниз');
        await processTab('potential_transformer', '17041161718820', 'ТНУ_1');
        await processTab('potential_transformer', '17041819680512', 'Трансформатор измерительный с двумя звездами');
        await processTab('potential_transformer', '17041859844863', 'Трансформатор напряжения с тремя вторичными обмотками');
        await processTab('potential_transformer', '17041907376046', 'ТНУ пустой');
    });

    it('проверка типовых элементов Трансформатор напряжения 15-20', async function () {
        await processTab('potential_transformer', '17041915585350', 'ТН 2 звезды без заземления');
        await processTab('potential_transformer', '17081668801771', 'Трансформатор напряжения измерительный с двумя вторичными обмотками (без схем соединения)');
        await processTab('potential_transformer', '17081853493967', 'Трансформатор напряжения измерительный двухобмоточный (без схем соединения)');
        await processTab('potential_transformer', '17082845111974', 'Трансформатор напряжения измерительный с двумя вторичными обмотками_1');
        await processTab('potential_transformer', '17082970213968', 'Трансформатор напряжения многообмоточный со схемами подключения без заземления');
    });

    it('проверка типовых элементов Трансформатор напряжения 21-25', async function () {
        await processTab('potential_transformer', '17082991567479', 'Трансформатор напряжения измерительный с одной вторичной обмоткой_III');
        await processTab('potential_transformer', '17090587323604', 'Трансформатор Напряжения измерительный с двумя вторичными обмотками и заземлением одной вторичной обмотки');
        await processTab('potential_transformer', '17091288833079', 'Трансформатор напряжения измерительный двухобмоточный (со схемой соединения)');
        await processTab('potential_transformer', '17092290860299', 'Трансформатор напряжения измерительный двухобмоточный (со схемой соеденения_I)');
        await processTab('potential_transformer', '17103008796033', 'Трансформатор напряжения измерительный двухобмоточный');
    });

    it('проверка типовых элементов Трансформатор напряжения 26-30', async function () {
        await processTab('potential_transformer', '17111387328232', 'Трансформатор напряжения измерительный с двумя вторичными обмотками с заземлением');
        await processTab('potential_transformer', '17111405244894', 'Трансформатор напряжения измерительный с двумя вторичными обмотками без заземлением');
        await processTab('potential_transformer', '17112304767101', 'Трансформатор напряжения многообмоточный без схем подключения');
        await processTab('potential_transformer', '17112905580120', 'Трансформатор напряжения измерительный с одной вторичной обмоткой(со схемой подключения)');
        await processTab('potential_transformer', '17112971032657', 'Трансформатор напряжения измерительный двухобмоточный (с заземлением одной обмотки)');
    });

    it('проверка типовых элементов Трансформатор напряжения 31-35', async function () {
        await processTab('potential_transformer', '17120571120563', 'Трансформатор напряжения измерительный с двумя обмотками с заземлением');
        await processTab('potential_transformer', '17120639281981', 'Трансформатор Напряжения измерительный с двумя вторичными обмотками и заземлением всех обмоток_2');
        await processTab('potential_transformer', '17120822759511', 'Трансформатор напряжения измерительный с тремя вторичными обмотками с заземлением (правое подключение)');
        await processTab('potential_transformer', '17120845495867', 'Трансформатор напряжения измерительный с тремя вторичными обмотками с заземлением (левое подключение)');
        await processTab('potential_transformer', '17121851039557', 'Трансформатор напряжения измерительный двухобмоточный без заземления обмоток');
    });

    it('проверка типовых элементов Трансформатор напряжения 36-40', async function () {
        await processTab('potential_transformer', '18011227084178', 'Трансформатор напряжения измерительный с двумя вторичными обмотками без заземления');
        await processTab('potential_transformer', '18031617963350', 'ТТрансформатор напряжения измерительный с двумя вторичными обмотками в левую сторону');
        await processTab('potential_transformer', '18040310191901', 'Трансформатор напряжения измерительный с двумя вторичными обмотками без заземления (замкнутые)');
        await processTab('potential_transformer', '18062135662344', 'ТН две звезды и разомкнутый треугольник');
        await processTab('potential_transformer', '19012300932879', 'ТН_две звезды_треугольник');
    });

    it('проверка типовых элементов Трансформатор напряжения 41-45', async function () {
        await processTab('potential_transformer', '19012919288123', 'Трансформатор напряжения емкостной');
        await processTab('potential_transformer', '19021807046975', 'ТН Гучково');
        await processTab('potential_transformer', '19021822102452', 'Трансформатор напряжения с тремя вторичными обмотками без заземления');
        await processTab('potential_transformer', '19021856320845', 'Трансформатор измерительный без обмоток с заземлением');
        await processTab('potential_transformer', '19021923053842', 'Трансформатор напряжения с тремя вторичными обмотками 2');
    });

    it('проверка типовых элементов Трансформатор напряжения 45-50', async function () {
        await processTab('potential_transformer', '19022064228607', 'Гибрид: трансформатор напряжения измерительный с двумя вторичными обмотками и трансформатор напряжения измерительный с одной вторичной обмоткой(со схемой подключения)');
        await processTab('potential_transformer', '19022108127520', 'ТН 1 2з 1т');
        await processTab('potential_transformer', '19022113775079', 'Тн 2в низ');
        await processTab('potential_transformer', '19022198580192', 'Тн 2 в');
        await processTab('potential_transformer', '19030402828153', 'Трансформатор напряжения 3НОМ с заземлением');
    });

    it('проверка типовых элементов Трансформатор напряжения 51-55', async function () {
        await processTab('potential_transformer', '19030433088150', 'Трансформатор напряжения 3НОМ');
        await processTab('potential_transformer', '19030438080200', 'Трансформатор напряжения 3 НОМ без заземления');
        await processTab('potential_transformer', '19030462683832', 'Трансформатор напряжения с тремя вторичными обмотками с заземлением');
        await processTab('potential_transformer', '19030516663273', 'ТН_трехобмоточный_влево');
        await processTab('potential_transformer', '19030516936197', 'Трансформатор напряжения с заземлением одной обмотки');
    });

    it('проверка типовых элементов Трансформатор напряжения 55-60', async function () {
        await processTab('potential_transformer', '19030524004205', 'Трансформатор напряжения с двумя вторичными обмотками с землей');
        await processTab('potential_transformer', '19030597736085', 'ТН многообмоточный');
        await processTab('potential_transformer', '19031222924923', 'ТН многообмоточный со схемами подключения без заземления');
        await processTab('potential_transformer', '19031229094095', 'ТН многообмоточный с двумя обмотками "звезда с нулем"');
        await processTab('potential_transformer', '19031241400109', 'ТН многообмоточный со схемами подключения Y+Y+Y+D');
    });

    it('проверка типовых элементов Трансформатор напряжения 60-62', async function () {
        await processTab('potential_transformer', '19031280717607', 'ТН пятиобмоточный со схемами соединения');
        await processTab('potential_transformer', '19031295645771', 'ТН многообмоточный с треугольником и схемой соединения звезды с нулем');
    });

    it('проверка типовых элементов Трансформатор тока', async function () {
        await processTab('current_transformer', '16081066040907');
    });

    it('проверка типовых элементов Участок линии переменного тока', async function () {
        await processTab('acline_segment', '16080888801445', 'Участок линии переменного тока_сеть с двумя терминалами ');
        await processTab('acline_segment', '16081512981069', 'Участок линии переменного тока');
        await processTab('acline_segment', '16081541333908', 'Линия_Сеть');
        await processTab('acline_segment', '18071905344462', 'Участок линии переменного тока с опорами');
        await processTab('acline_segment', '19012204086646', 'Кабельный участок линии');
    });

    it('проверка типовых элементов Фильтр присоединений 1-3', async function () {
        await processTab('signal_filter', '16081898659573', 'ШОН. ФП');
        await processTab('signal_filter', '16083125709110', 'ШОН. Шкаф_Отбора_Напряжения');
        await processTab('signal_filter', '16083199966754', 'ШОН. ФП_вверх');
    });

    it('проверка типовых элементов Фильтр присоединений 4-7', async function () {
        await processTab('signal_filter', '17070505807978', 'ШОН. ФП_влево');
        await processTab('signal_filter', '17112741493580', 'ШОН. ФП + ЗН НОКС');
        await processTab('signal_filter', '19021914033681', 'ШОН. ФП_вниз');
        await processTab('signal_filter', '19022113220720', 'ШОН. ФП - ШОН');
    });

    it('проверка типовых элементов Шунтирующий реактор', async function () {
        await processTab('static_var_compensator', '19031421757945', 'Шунтирующий реактор');
        await processTab('static_var_compensator', '19031423342662', 'Управляемый шунтирующий реактор');
    });

    it('проверка типовых элементов Другое 1-5', async function () {
        await processTab('other', '14051921905138', 'DEV_NAME');
        await processTab('other', '16081760923728', 'Кабельная воронка');
        await processTab('other', '17113098293533', 'Диод');
        await processTab('other', '20082803705355', '“Нетиповая” схема, конструкция');
        await processTab('other', '20082822842591', 'Наличие в ЭУ ТН, включенного по особой схеме');
    });

    it('проверка типовых элементов Другое 5-10', async function () {
        await processTab('other', '20082835562525', 'ЭУ оснащена охранной сигнализацией');
        await processTab('other', '20082839212251', 'Газовая система пожаротушения');
        await processTab('other', '20082847348682', 'Объект здравоохранения');
        await processTab('other', '20082855208829', 'Заземляющие ножи (наличие в ЭУ)');
        await processTab('other', '20082867199037', 'Ограничитель перенапряжения');
    });

    it('проверка типовых элементов Другое 10-13', async function () {
        await processTab('other', '20082881911618', 'Травмоопасное оборудование');
        await processTab('other', '20082897891435', 'Воздушная линия (ВЛ) под наведенным напряжением');
        await processTab('other', '20121732640038', 'Деление сети');
    });   
})