// проверка формы создания заявки к профильному специалисту

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
            .click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .assert.textContains('button[data-id="field_786_MTAwNTMyNDU=_10053247"]', "Юридическая поддержка")  
            .expect.element('#form9886142').to.be.visible
    },

    'Смена рубрики на Запись к профильному специалисту': function(browser) {
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053247"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(26) > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .expect.element('#form9886142').to.be.visible

         // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').text.to.equal('Тематика')
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > legend').text.to.equal('Специалист')
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > legend').text.to.equal('Способ коммуникации')
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > legend').not.to.be.visible // поле Дата в данном кейсе не должно показываться, если не выбран способ коммуникации телефон/видео
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
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > div > div').text.to.equal('Заполните это поле.')
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > div > div').text.to.equal('Заполните это поле.')
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. чек-бокс не проставлен
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Вы пропустили это поле.')
    },

    'Телефон без выбора специалиста': function(browser) {
        browser
            .click('button[data-id="field_786_MTI1MjU2MDY=_12525610"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(3) > a')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. не выбран специалист
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Выберите один из пунктов списка.')
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. нельзя выбрать способ коммуникации без специалиста
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').text.to.equal('Запись на устные или видео консультации возможна только при выборе специалиста')
    },

    'Нельзя выбрать дату без выбора специалиста': function(browser) {
        browser.click('#button-date-select')

        browser.verify.visible('div[class="modal fade show"] > div') // попап с календарем не должен появиться - тест упадет
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.') 
    },
    
    'Видео без выбора специалиста': function(browser) {
        browser.refresh()
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053247"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(26) > a')
            .click('button[data-id="field_786_MTI1MjU2MDY=_12525610"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(4) > a')
        browser    
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. не выбран специалист
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Выберите один из пунктов списка.')
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. нельзя выбрать способ коммуникации без специалиста
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').text.to.equal('Запись на устные или видео консультации возможна только при выборе специалиста')
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.') 
    }, 

    'Выбор специалиста': function(browser) {
        browser
            .click('button[data-id="field_786_MTI1MjU2MDY=_12525609"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a ')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.')   
    },

     // проверка, что если выбраны специалист и способ коммуникации (телефон или видео), то можно выбрать дату

    'Выбор даты': function(browser) {
        browser
            .click('#button-date-select')

        browser.expect.element('div[class="modal fade show"] > div').to.be.visible // проверка, что попап с календарем появился  
    }, 

    'Нельзя отправить заявку без проставления чек-бокса': function(browser) {
        browser.refresh()

        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053247"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(26) > a') // выбор тематики
            .click('button[data-id="field_786_MTI1MjU2MDY=_12525609"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a ')  // выбор специалиста
            .click('button[data-id="field_786_MTI1MjU2MDY=_12525610"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a') // выбор способа коммуникации (письменная)
            .setValue('textarea[name="content_params_id[442][12525619][value]"]', 'Тест разработчиков')
            .setValue('textarea[name="content_params_id[442][12525620][value]"]', 'Тест разработчиков')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. чек-бокс не проставлен
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Вы пропустили это поле.')    
    } 
};            