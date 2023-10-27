// проверки формы создания заявки add, смена рубрики, отображение нужных полей в форме

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
    
    'Смена рубрики на Запись к дежурному терапевту': function(browser) {
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053247"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(25) > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .expect.element('#form9886142').to.be.visible

         // проверки, что все необходимые поля формы отображаются:

        browser.expect.element('#parameters_templated > div:nth-child(2) > fieldset > legend').text.to.equal('Тематика')
        browser.expect.element('#parameters_templated > div:nth-child(3) > fieldset > legend').not.to.be.visible // поле Специалист в данном кейсе должно быть скрыто
        browser.expect.element('#parameters_templated > div:nth-child(4) > fieldset > legend').text.to.equal('Способ коммуникации')
        browser.expect.element('#parameters_templated > div:nth-child(5) > fieldset > legend').text.to.equal('Дата')
        browser.expect.element('#parameters_templated > div:nth-child(12) > fieldset > legend').text.to.equal('Какие у Вас основные жалобы?')
        browser.expect.element('#parameters_templated > div:nth-child(13) > fieldset > legend').text.to.equal('Кратко опишите, какую именно помощь Вы хотите получить.')
        browser.expect.element('#parameters_templated > div:nth-child(14) > fieldset > legend').text.to.equal('Другая медицинская информация, которая может понадобиться врачу, по Вашему мнению.')
        browser.expect.element('#parameters_templated > div:nth-child(15) > fieldset > legend').text.to.equal('Файлы') 
        browser.expect.element('#parameters_templated > div:nth-child(16) > fieldset > legend').text.to.equal('Согласие')         
    }, 

    'Смена рубрики на Запись к профильному специалисту': function(browser) {
        browser
            .click('button[data-id="field_786_MTI1MzcxNDg=_12537150"]')
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
    }          
};    