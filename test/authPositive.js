module.exports = {
    '@tags': ['profile', 'important'],
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .url('https://lk-zabota.pravocard.ru/login/')
            .waitForElementVisible('#ajax-register-form');       
        browser
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация"); 

    }, 

    after(browser) {  
      browser.end();  
    },

        'Log in': function(browser) {  
        browser
            .setValue('#inputEmail', 'los.marinaa@ya.ru')
            .setValue('#inputPassword', '12345678') 
            .click('#ajax-register-form button') 

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги"); 
        },

};      