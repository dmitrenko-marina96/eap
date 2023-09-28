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
            .login('mkbtest@yandex.ru', '123456')
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги"); 
    },

    'Переход в Избранные специалисты': function() {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('.listing-panel-search').to.be.visible // фильтр
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