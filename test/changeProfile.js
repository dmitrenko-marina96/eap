module.exports = {
    before(browser) {
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
            .login('spbtest@yandex.ru', '123456q!')
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги"); 
    },

    'Переход в профиль': function(browser) {
        browser
            .click('#dropdownProfile')
            .click('li:nth-child(1) > .dropdown-item')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/profile/')
            .assert.titleContains('Тестов Тест СпБ', 'title ok')
            .assert.textContains("h2", "Тестов Тест СпБ")
    },

    'Переход в редактирование профиля': function(browser) {
        browser.click('.bi-pencil')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/profile/edit/')
            .assert.titleContains('Тестов Тест СпБ', 'title ok')
            .assert.textContains("h2", "Тестов Тест СпБ")
            .expect.element('#form9882943').to.be.visible

    // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('fieldset:nth-child(2) > legend').text.to.equal('ФИО')
        browser.expect.element('fieldset:nth-child(3) > legend').text.to.equal('Email')
        browser.expect.element('fieldset:nth-child(4) > legend').text.to.equal('Телефон')
        browser.expect.element('fieldset:nth-child(5) > legend').text.to.equal('Пароль')
        browser.expect.element(' fieldset:nth-child(6) > legend').text.to.equal('Email уведомления')
        browser.expect.element('fieldset:nth-child(13) > legend').text.to.equal('Дата рождения')    
    
    },

    'Изменить телефон': function(browser) {
        browser
            .clearValue('fieldset:nth-child(4) .form-control')
            .setValue('fieldset:nth-child(4) .form-control', '+7 (777) 959-59-77')
            .click('#btn-save')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/profile/')
            .assert.titleContains('Тестов Тест СпБ', 'title ok')
            .assert.textContains("h2", "Тестов Тест СпБ")    
            .expect.element('.display:nth-child(2) > .col-xs-7').text.to.equal('+7 (777) 959-59-77') // проверка, что номер корректно сохранился    
    },

     'Еще раз переход в редактирование профиля': function(browser) {
        browser.click('.bi-pencil')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/profile/edit/')
            .assert.titleContains('Тестов Тест СпБ', 'title ok')
            .assert.textContains("h2", "Тестов Тест СпБ")
            .expect.element('#form9882943').to.be.visible
    },   

    'Повтороно изменить телефон': function(browser) {
        browser
            .clearValue('fieldset:nth-child(4) .form-control')
            .setValue('fieldset:nth-child(4) .form-control', '+7 (787) 959-59-55')
            .click('#btn-save')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/profile/')
            .assert.titleContains('Тестов Тест СпБ', 'title ok')
            .assert.textContains("h2", "Тестов Тест СпБ")    
            .expect.element('.display:nth-child(2) > .col-xs-7').text.to.equal('+7 (787) 959-59-55') // проверка, что номер корректно сохранился    
    }
};
