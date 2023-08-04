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

    'Нажать на кнопку Создать заявку': function(browser) {
        browser
            .click('#AJAX_MAIN>div>div>div>div>div>div:nth-child(4)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/zajavki-9886142/add/')
            .assert.titleContains('Заявки', 'title ok')
            .assert.textContains("h2", "Новая заявка")
            .assert.textContains('button[data-id="field_786_MTAwNTMyNDU=_10053247"]', "Юридическая поддержка")  
           //.expect.elements('legend').count.to.equal(5)
        browser
            .expect.element('#form9886142').to.be.visible;
    },   
      
    'Заполнение формы': function(browser) {
        
        browser
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053248"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2) > a ')
            .click('button[data-id="field_786_MTAwNTMyNDU=_10053249"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(3) > a')
            .setValue('input[name="content_params_id[442][10053251][value]"]', 'Тест разработчиков')
            .setValue('textarea[name="content_params_id[442][10053252][value]"]', 'Тестовое сообщение')
            .expect.element('button[type="submit"]').to.be.enabled 
           //.click('button[type="submit"]');
    }   
};      