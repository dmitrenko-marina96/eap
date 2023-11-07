module.exports = {
    '@tags': ['usluga'],
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
            .login('mkbtest@yandex.ru', '123456')
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги"); 
    },

    'Переход в раздел Телемедицина': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(5) > a')
   
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12475072/?is_parent=1')
           .assert.titleContains('Телемедицина', 'title ok')
           .assert.textContains("h2", "Телемедицина")
           .assert.textContains(".col-md-4:nth-child(1) > .services", "Запись к дежурному терапевту")
           .assert.textContains(".col-md-4:nth-child(2) > .services", "Запись к профильному специалисту")
    },

    'Переход в Запись к профильному специалисту': function(browser) {
        browser.click('.col-md-4:nth-child(2) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
            .assert.textContains(".col-md-4:nth-child(1) > .services", "Аллерголог")
            .assert.textContains(".col-md-4:nth-child(2) > .services", "Гинеколог")
            .assert.textContains(".col-md-4:nth-child(3) > .services", "Кардиолог")
            .assert.textContains(".col-md-4:nth-child(4) > .services", "Невролог")
            .assert.textContains(".col-md-4:nth-child(5) > .services", "Отоларинголог")
            .assert.textContains(".col-md-4:nth-child(6) > .services", "Уролог")
            .assert.textContains(".col-md-4:nth-child(7) > .services", "Гастроэнтеролог")
            .assert.textContains(".col-md-4:nth-child(8) > .services", "Онколог")
            .assert.textContains(".col-md-4:nth-child(9) > .services", "Дерматолог")
            .assert.textContains(".col-md-4:nth-child(10) > .services", "Окулист")
            .assert.textContains(".col-md-4:nth-child(11) > .services", "Педиатр")
            .assert.textContains(".col-md-4:nth-child(12) > .services", "Терапевт")
            .assert.textContains(".col-md-4:nth-child(13) > .services", "Эндокринолог")
    },

    'Аллерголог': function(browser) {
        browser.click('.col-md-4:nth-child(1) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468118/?is_parent=1')
            .assert.titleContains('Аллерголог', 'title ok')
            .assert.textContains("h2", "Аллерголог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back1': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },        

    'Гинеколог': function(browser) {
        browser.click('.col-md-4:nth-child(2) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468141/?is_parent=1')
            .assert.titleContains('Гинеколог', 'title ok')
            .assert.textContains("h2", "Гинеколог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back2': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

     'Кардиолог': function(browser) {
        browser.click('.col-md-4:nth-child(3) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468148/?is_parent=1')
            .assert.titleContains('Кардиолог', 'title ok')
            .assert.textContains("h2", "Кардиолог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back3': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },
     
    'Невролог': function(browser) {
        browser.click('.col-md-4:nth-child(4) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468158/?is_parent=1')
            .assert.titleContains('Невролог', 'title ok')
            .assert.textContains("h2", "Невролог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back4': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },
     
    'Отоларинголог': function(browser) {
        browser.click('.col-md-4:nth-child(5) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468162/?is_parent=1')
            .assert.titleContains('Отоларинголог', 'title ok')
            .assert.textContains("h2", "Отоларинголог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back5': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Уролог': function(browser) {
        browser.click('.col-md-4:nth-child(6) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468165/?is_parent=1')
            .assert.titleContains('Уролог', 'title ok')
            .assert.textContains("h2", "Уролог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back6': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Гастроэнтеролог': function(browser) {
        browser.click('.col-md-4:nth-child(7) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474565/?is_parent=1')
            .assert.titleContains('Гастроэнтеролог', 'title ok')
            .assert.textContains("h2", "Гастроэнтеролог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back7': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Онколог': function(browser) {
        browser.click('.col-md-4:nth-child(8) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12536396/?is_parent=1')
            .assert.titleContains('Онколог', 'title ok')
            .assert.textContains("h2", "Онколог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back8': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Дерматолог': function(browser) {
        browser.click('.col-md-4:nth-child(9) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474566/?is_parent=1')
            .assert.titleContains('Дерматолог', 'title ok')
            .assert.textContains("h2", "Дерматолог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back9': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Окулист': function(browser) {
        browser.click('.col-md-4:nth-child(10) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474567/?is_parent=1')
            .assert.titleContains('Окулист', 'title ok')
            .assert.textContains("h2", "Окулист")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back10': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Педиатр': function(browser) {
        browser.click('.col-md-4:nth-child(11) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474568/?is_parent=1')
            .assert.titleContains('Педиатр', 'title ok')
            .assert.textContains("h2", "Педиатр")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back11': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Терапевт': function(browser) {
        browser.click('.col-md-4:nth-child(12) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474569/?is_parent=1')
            .assert.titleContains('Терапевт', 'title ok')
            .assert.textContains("h2", "Терапевт")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back12': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Эндокринолог': function(browser) {
        browser.click('.col-md-4:nth-child(13) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12474570/?is_parent=1')
            .assert.titleContains('Эндокринолог', 'title ok')
            .assert.textContains("h2", "Эндокринолог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Click back13': function(browser) {
        browser.click('.d-lg-inline')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
    },

    'Возврат в раздел Телемедицина': function(browser) {
        browser.click('.d-lg-inline')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12475072/?is_parent=1')
           .assert.titleContains('Телемедицина', 'title ok')
           .assert.textContains("h2", "Телемедицина")
           .assert.textContains(".col-md-4:nth-child(1) > .services", "Запись к дежурному терапевту")
           .assert.textContains(".col-md-4:nth-child(2) > .services", "Запись к профильному специалисту")
    },

    'Возврат в Услуги': function(browser) {
        browser.click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    }
};    