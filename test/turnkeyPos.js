module.exports = {
    '@tags': ['form', 'nalog'],
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
    
    'Services taxes': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(2) > div > a')
        
        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206025/?is_parent=1')
           .assert.titleContains('Налоги', 'title ok')
           .assert.textContains("h2", "Налоги")
           .assert.textContains(".taxman", "Специалист по налогам")
           .assert.textContains(".turnkey", "Налоговый вычет «Под ключ»")   
    },

    'Services turnkey': function(browser) {    
        browser.click('#listingForm > div > div > div:nth-child(2) > div > a')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030652/?is_parent=1')
            .assert.titleContains('Налоговый вычет «Под ключ»', 'title ok')
            .assert.textContains("h2", "Налоговый вычет «Под ключ»")
            .assert.textContains(".carousel-item > .h3", "Выберите тип вычета*")
            .expect.element('#form9886142').to.be.visible
    },

    'Step 1': function(browser) {
        browser.click('input[value="9883390"]')

         browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.textContains(".carousel-item > .h3", "Выберите тип вычета*")
    },

    'Step 2': function(browser) {
        browser.click('#btn-save-slide > div > div:nth-child(2) > button:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.textContains("#form_slide_data > div > div.carousel-item.active > div.h3.listing-group-by-title", "Персональные данные")
    },

    'Step 2.1': function(browser) {
        browser.setValue('#link_1eb8a2d01dd04096afe11e7b1147081e', 'https://lk-zabota.pravocard.ru/download/?ant=1689938547&file=static1_pravocard%2Fuploads%2F2023%2F07%2F21%2F1ANosjyJzBo_64ba6a72bccc2.pdf')
        browser.click('#field_1eb8a2d01dd04096afe11e7b1147081e .btn:nth-child(3)')
        browser.click('#btn-save-slide > div > div:nth-child(2) > button:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.textContains("#form_slide_data > div > div.carousel-item.active > div.h3.listing-group-by-title", "Декларирование дохода")
    },

    'Step 3': function(browser) {
        browser.click('#btn-save-slide > div > div:nth-child(2) > button:nth-child(1)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.textContains("#form_slide_data > div > div.carousel-item.active > div.h3.listing-group-by-title", "Подтверждение")
            .expect.element('input[type="email"]').to.have.value.that.equals('los.marinaa@ya.ru')
    },  

    'Step 3.1': function(browser) {
        browser
            .setValue('textarea[name="content_params_id[442][10161156][value]"]', 'Тестовая заявка')
            //.waitForElementVisible('body', 'Заголовок загружен')
            expect.element('#btn-save').to.be.enabled
    }        
};
