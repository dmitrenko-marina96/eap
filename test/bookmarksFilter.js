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
            .login('los.marinaa@ya.ru', '12345678')
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
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('.listing-panel-search').to.be.visible // фильтр
    },

    'Проверка, что в фильтре отображаются все специалисты': function() {
        browser.click('button[class="form-control dropdown-toggle bs-placeholder"]')

        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(2)').text.to.equal('Юрист')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(3)').text.to.equal('Финансист') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(4)').text.to.equal('Специалист по налоговому вычету') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(5)').text.to.equal('Психолог') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(6)').text.to.equal('Консультант по здоровому образу жизни') 
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(7)').text.to.equal('Автоэксперт')
        browser.expect.element('div[class="dropdown-menu show"] > div > ul > li:nth-child(8)').text.to.equal('Мастер по дому')
    }
};    