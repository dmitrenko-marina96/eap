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
           .assert.textContains(".col-md-4:nth-child(1) > .services", "Запись к дежурному терапевту")
           .assert.textContains(".col-md-4:nth-child(2) > .services", "Запись к профильному специалисту")
    },

    'Переход в форму Запись к дежурному терапевту': function(browser) {
        browser.click('.col-md-4:nth-child(1) > .services')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989/12467913/?flds[pages_ids]=12284017,12467913,12468232')
            .assert.titleContains('Запись к дежурному терапевту', 'title ok')
            .assert.textContains("h2", "Запись к дежурному терапевту")
            .expect.element('#form9886142').to.be.visible

         // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').not.to.be.visible // поле Тематика в данном кейсе должно быть скрыто
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > legend').not.to.be.visible // поле Специалист в данном кейсе должно быть скрыто
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > legend').text.to.equal('Способ коммуникации')
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > legend').text.to.equal('Дата')
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > legend').text.to.equal('Какие у Вас основные жалобы?')
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > legend').text.to.equal('Кратко опишите, какую именно помощь Вы хотите получить.')
        browser.expect.element('#parameters_templated > div:nth-child(14) > fieldset > legend').text.to.equal('Другая медицинская информация, которая может понадобиться врачу, по Вашему мнению.')
        browser.expect.element('#parameters_templated > div:nth-child(15) > fieldset > legend').text.to.equal('Файлы') 
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > legend').text.to.equal('Согласие')         
    },

    'Нельзя отправить пустую форму': function(browser) {
        browser.click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. не выбран способ коммуникации
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Выберите один из пунктов списка.') 
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div').text.to.equal('Заполните это поле.') 
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > div > div').text.to.equal('Заполните это поле.')
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > div > div').text.to.equal('Заполните это поле.')
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. чек-бокс не проставлен
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Вы пропустили это поле.')
    }
};    