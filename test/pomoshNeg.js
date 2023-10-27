module.exports = {
    '@tags': ['form'],
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .page.auth()
            .navigate()
        browser   
            .waitForElementVisible('#ajax-register-form')       
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация") 
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

    'Перейти в раздел Помощь': function(browser) {
        browser.click('#menu > li:nth-child(4) > a.nav-link.p-3')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/pomosh-9894869/')
            .assert.titleContains('Помощь', 'title ok')
            .assert.textContains("h2", "Помощь")           
    },

    'Перейти к созданию новой заявки': function(browser) {
        browser.click('.btn-primary > .d-none')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/pomosh-9894869/add/')
            .assert.titleContains('Помощь', 'title ok')
            .assert.textContains("h2", "Новое обращение")
            .expect.element('#form9894869').to.be.visible
    },

    'Нельзя отправить тикет без заполнения темы': function(browser) {
        browser.click('button[type="submit"]')

        browser.expect.element('.field-after-error-text').to.be.visible // ошибка, т.к. не заполнено поле Тема
        browser.expect.element('.field-after-error-text').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле 
    },

    'Заполнить тему': function(browser) {
        browser
            .setValue('#field_4421', 'Тестовая заявка')
            .expect.element('button[type="submit"]').to.be.enabled
            //.click('button[type="submit"]') 
    }
};    