module.exports = {
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .page.auth()
            .navigate()
        browser   
            .waitForElementVisible('#ajax-register-form')       
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация"); 
    }, 

    after(browser) {  
      browser.end();  
    },

    'Login': function(browser) {  
        browser
            .page.auth()
            .login('los.marinaa@ya.ru', '12345678')
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги"); 
    },

    'Services lawyer': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')
   
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
           .assert.titleContains('Юридическая поддержка', 'title ok')
           .assert.textContains("h2", "Юридическая поддержка")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible;
           //.expect.element('#page_boxes_1').to.be.visible
    },
        
    'Click back1': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги") 
    },

    'Services taxes': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(2) > a')
   
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206025/?is_parent=1')
           .assert.titleContains('Налоги', 'title ok')
           .assert.textContains("h2", "Налоги")
           .assert.textContains(".taxman", "Специалист по налогам")
           .assert.textContains(".turnkey", "Налоговый вычет «Под ключ»")
    },

    'Services taxman': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206027/?is_parent=1')
            .assert.titleContains('Консультация по вопросам налогов', 'title ok')
            .assert.textContains("h2", "Консультация по вопросам налогов") 
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back2': function(browser) {
        browser.click('.d-lg-inline')

        browser
        .waitForElementVisible('body', 'Заголовок загружен')
        .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206025/?is_parent=1')
        .assert.titleContains('Налоги', 'title ok')
        .assert.textContains("h2", "Налоги")
        .assert.textContains(".taxman", "Специалист по налогам")
        .assert.textContains(".turnkey", "Налоговый вычет «Под ключ»")
    },

    'Click back2.1': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },        

    'Services financier': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(3) > a')
        
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030655/?is_parent=1')
           .assert.titleContains('Финансовое консультирование', 'title ok')
           .assert.textContains("h2", "Финансовое консультирование")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back3': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },

    'Services zozh': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(4) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10141754/?is_parent=1')
           .assert.titleContains('Здоровый образ жизни', 'title ok')
           .assert.textContains("h2", "Здоровый образ жизни")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back4': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },
    
    'Services psychologist': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(5) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030653/?is_parent=1')
           .assert.titleContains('Психологическая поддержка', 'title ok')
           .assert.textContains("h2", "Психологическая поддержка")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back5': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },

    'Services home': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(6) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206059/?is_parent=1')
           .assert.titleContains('Помощь по дому', 'title ok')
           .assert.textContains("h2", "Помощь по дому")
           .assert.textContains(".househelper", "Помощь по дому")
           .assert.textContains(".housemaster", "Выезд мастера по дому")
           .assert.textContains(".cleaning", "Клининг")
    },

    'Services househelper': function(browser) { 
        browser.click('#listingForm > div > div > div:nth-child(1) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10051998/?is_parent=1')
           .assert.titleContains('Помощь по дому', 'title ok')
           .assert.textContains("h2", "Помощь по дому")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back6': function(browser) {
        browser.click('.d-lg-inline')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206059/?is_parent=1')
           .assert.titleContains('Помощь по дому', 'title ok')
           .assert.textContains("h2", "Помощь по дому")
           .assert.textContains(".househelper", "Помощь по дому")
           .assert.textContains(".housemaster", "Выезд мастера по дому")
           .assert.textContains(".cleaning", "Клининг")
    },
    
    'Click back6.1': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")      
    },

    'Services auto': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(7) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10204328/?is_parent=1')
           .assert.titleContains('Авто', 'title ok')
           .assert.textContains("h2", "Авто")
           .assert.textContains(".autoassistance", "Авто Ассистанс")
           .assert.textContains(".autoexpert", "Выезд автоэксперта")
    },

    'Services autoassistance': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10051999/?is_parent=1')
           .assert.titleContains('Авто Ассистанс', 'title ok')
           .assert.textContains("h2", "Авто Ассистанс")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Click back7': function(browser) {
        browser.click('.d-lg-inline')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10204328/?is_parent=1')
           .assert.titleContains('Авто', 'title ok')
           .assert.textContains("h2", "Авто")
           .assert.textContains(".autoassistance", "Авто Ассистанс")
           .assert.textContains(".autoexpert", "Выезд автоэксперта")
    },

    'Click back7.1': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    }
};             