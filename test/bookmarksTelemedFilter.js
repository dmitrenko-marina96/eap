module.exports = {
    '@tags': ['bookmark'],
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
        browser.click('#listingForm > div > div > div:nth-child(5) > div > a')
   
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12475072/?is_parent=1')
           .assert.titleContains('Телемедицина', 'title ok')
           .assert.textContains("h2", "Телемедицина")
           .assert.textContains(".col-md-4:nth-child(1)", "Запись к дежурному терапевту")
           .assert.textContains(".col-md-4:nth-child(2)"," к профильному специалисту")
    },

    'Переход в Запись к профильному специалисту': function(browser) {
        browser.click('.col-md-4:nth-child(2)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12467939/?is_parent=1')
            .assert.titleContains('Запись к профильному специалисту', 'title ok')
            .assert.textContains("h2", "Запись к профильному специалисту")
            .assert.textContains(".col-md-4:nth-child(1)", "Аллерголог")
            .assert.textContains(".col-md-4:nth-child(2)", "Гинеколог")
            .assert.textContains(".col-md-4:nth-child(3)", "Кардиолог")
            .assert.textContains(".col-md-4:nth-child(4)", "Невролог")
            .assert.textContains(".col-md-4:nth-child(5)", "Отоларинголог")
            .assert.textContains(".col-md-4:nth-child(6)", "Уролог")
            .assert.textContains(".col-md-4:nth-child(7)", "Гастроэнтеролог")
            .assert.textContains(".col-md-4:nth-child(8)", "Онколог")
            .assert.textContains(".col-md-4:nth-child(9)", "Дерматолог")
            .assert.textContains(".col-md-4:nth-child(10)", "Окулист")
            .assert.textContains(".col-md-4:nth-child(11)", "Педиатр")
            .assert.textContains(".col-md-4:nth-child(12)", "Терапевт")
            .assert.textContains(".col-md-4:nth-child(13)", "Эндокринолог")
    },

    'Аллерголог': function(browser) {
        browser.click('.col-md-4:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/12468118/?is_parent=1')
            .assert.titleContains('Аллерголог', 'title ok')
            .assert.textContains("h2", "Аллерголог")
            .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // фильтр
    },

    'Добавить специалиста в избранное': function(browser) {
        browser.click('#Bookmark12543846 > button > i')
    },

    'Переход в Избранные специалисты': function() {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
           // .expect.element('.listing-panel-search').to.be.visible // фильтр скрыли 
    },

    'Проверка, что в фильтре отображаются специалисты сервиса Телемедицина': function() {
        browser.click('button[class="form-control dropdown-toggle bs-placeholder"]')

        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(6)').text.to.equal('Аллерголог')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(7)').text.to.equal('Гинеколог') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(8)').text.to.equal('Кардиолог') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(9)').text.to.equal('Невролог') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(10)').text.to.equal('Отоларинголог') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(11)').text.to.equal('Уролог')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(12)').text.to.equal('Гастроэнтеролог')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(13)').text.to.equal('Онколог')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(14)').text.to.equal('Дерматолог')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(15)').text.to.equal('Окулист')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(16)').text.to.equal('Педиатр')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(17)').text.to.equal('Терапевт') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(18)').text.to.equal('Эндокринолог')  
    }
};    