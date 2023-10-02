// проверки формы Выезда мастера по дому

module.exports = {
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
        
    'Переход в раздел Заявки': function(browser) {
        browser
            .click('#menu')
           
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Заявки"); 
    },   

    'Проверка формы /zajavki-9886142/add/': function(browser) {
        browser
            .click('#AJAX_MAIN>div>div>div>div>div>div:nth-child(4)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .assert.textContains('button[data-id="field_786_MTAwNTMyNDU=_10053247"]', "Юридическая поддержка")  
            .expect.element('#form9886142').to.be.visible
    },

    'Проверка формы Выезда масетра по дому': function(browser) {
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053247"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(29) > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")

        // проверки, что отображаются нужные поля
        
        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').text.to.equal('Тематика')  
        browser.expect.element('#form_slide_data > div > div.carousel-item.active > div:nth-child(7) > fieldset > legend').text.to.equal('ФИО')
        browser.expect.element('#btn-save-slide > div > div:nth-child(2) > button:nth-child(1)').text.to.equal('Вперед')  // проверка пошаговой формы - кнопка Вперед вместо Записаться
        browser.expect.element('button[type="button"]').to.be.enabled 
    },

    'Переход в Услуги': function(browser) {
         browser.click('.nav-item:nth-child(2) > .nav-link')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },

    'Переход в раздел Помощь по дому': function(browser) {
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

    'Переход к созданию заявки Выезд мастера по дому': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(2) > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10145016/?is_parent=1')
            .assert.titleContains('Выезд мастера по дому', 'title ok')
            .assert.textContains("h2", "Выезд мастера по дому")

        // проверка, что отображаются нужные поля    

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').not.to.be.visible  // поле Тематика в данном кейсе должно быть скрыто  
        browser.expect.element('#form_slide_data > div > div.carousel-item.active > div:nth-child(7) > fieldset > legend').text.to.equal('ФИО') 
        browser.expect.element('#btn-save-slide > div > div:nth-child(2) > button:nth-child(1)').text.to.equal('Вперед')  // проверка пошаговой формы - кнопка Вперед вместо Записаться
        browser.expect.element('button[type="button"]').to.be.enabled  
    }
};            