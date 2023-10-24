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
            .click('.d-lg-inline')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .assert.textContains('button[data-id="field_786_MTAwNTMyNDU=_10053247"]', "Юридическая поддержка")  
            .expect.element('#form9886142').to.be.visible

    // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').text.to.equal('Тематика')
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > legend').text.to.equal('Специалист')
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > legend').text.to.equal('Способ коммуникации')
        browser.expect.element('#parameters_templated > div:nth-child(6) > fieldset > legend').text.to.equal('Тема консультации')
        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > legend').text.to.equal('Вопрос')
        browser.expect.element('#parameters_templated > div:nth-child(8) > fieldset > legend').text.to.equal('Файлы') 
    },   
     
    'Нельзя отправить пустую заявку': function(browser) {
        
        browser.click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. не выбран способ коммуникации
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Выберите один из пунктов списка.') 
        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле Вопрос не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > div > div').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле
    },

    // проверки, что запись на устные или видео консультации возможна только при выборе специалиста 

    'Телефон без выбора специалиста': function(browser) {
         browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053249"]')
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
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле
    },

    'Видео без выбора специалиста': function(browser) {
        browser.refresh()
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053249"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(4) > a')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. не выбран специалист
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Выберите один из пунктов списка.')
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. нельзя выбрать способ коммуникации без специалиста
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > div > div.spec-after-error-text.text-danger').text.to.equal('Запись на устные или видео консультации возможна только при выборе специалиста')
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле
    },

    'Выбор специалиста': function(browser) {
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053248"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a ')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').to.be.visible // сообщение об ошибке, т.к. дата не выбрана
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > div > div.field-after-error-text.text-danger').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле   
    },

    // проверка, что если выбраны специалист и спсоб коммуникации (телефон или видео), то можно выбрать дату

    'Выбор даты': function(browser) {
        browser
            .click('#button-date-select')

        browser.expect.element('div[class="modal fade show"] > div').to.be.visible // проверка, что попап с календарем появился  
    },

    'Нельзя отправить заявку без заполнения поля Вопрос': function(browser) {
        browser.refresh()
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053248"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a ')
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053249"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(3) > a')
            .setValue('input[name="content_params_id[442][10053251][value]"]', 'Тест разработчиков')
            .click('button[type="submit"]')

        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > div > div').to.be.visible // сообщение об ошибке, т.к. поле Вопрос не заполнено
        browser.expect.element('#parameters_templated > div:nth-child(7) > fieldset > div > div').text.to.equal('Заполните это поле.') // !!! но в форме Вы пропустили это поле
    }    
};  