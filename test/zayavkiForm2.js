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

    'Переход в раздел Юридическая поддержка': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')
   
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
           .assert.titleContains('Юридическая поддержка', 'title ok')
           .assert.textContains("h2", "Юридическая поддержка")
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

    'Нажать на Записаться на карточке специалиста': function(browser) {
        browser.click('#listingForm > div > div:nth-child(1) > div > div:nth-child(4) > div > div > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/zajavki-9886142/add/?flds[pages_ids]=10030650,9969356')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")

        // проверки, что отображаются верные поля

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').not.to.be.visible // поле Тематика не должно отображаться в данном кейсе
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > legend').text.to.equal('Специалист')
        browser.expect.element('button[data-id="field_786_MTAwNTMyNDU=_10053248"]').text.to.equal('Иванов Иван') // специалист в данном кейсе должен быть выбран
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > legend').text.to.equal('Способ коммуникации')
        browser.expect.element('#parameters_templated > div:nth-child(6) > fieldset > legend').text.to.equal('Тема консультации')
        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > legend').text.to.equal('Вопрос')
        browser.expect.element('#parameters_templated > div:nth-child(8) > fieldset > legend').text.to.equal('Файлы')     
    }
};           