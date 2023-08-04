module.exports = {
    before(browser) {
        browser
            .url('https://lk-zabota.pravocard.ru/login/')
            .waitForElementVisible('#ajax-register-form')       
        browser
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация"); 

    }, 

    after(browser) {  
      browser.end();  
    },

    'Не вводить логин': function(browser) {
        browser
            //.setValue('#inputEmail', 'los.marinaa@ya.ru')
            .setValue('#inputPassword', '12345678') 
            .click('#ajax-register-form button')

        browser
            .waitForElementVisible('#ajax-register-form')  
            .assert.urlContains('https://lk-zabota.pravocard.ru/login/')    
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация")     
    },

    'Не вводить пароль': function(browser) {  
        browser
            .setValue('#inputEmail', 'los.marinaa@ya.ru')
            .clearValue('#inputPassword') 
            .click('#ajax-register-form button') 

        browser
            .waitForElementVisible('#ajax-register-form')  
            .assert.urlContains('https://lk-zabota.pravocard.ru/login/')    
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация") 
    },
    
    'Ввести неверный пароль': function(browser) {
        browser
            //.setValue('#inputEmail', 'los.marinaa@ya.ru')
            .setValue('#inputPassword', '12345')
            .click('#ajax-register-form button')

        browser.expect.element('#ajax-register-form > div.auth-error.text-danger').to.be.visible // ошибка, т.к. пароль неверный 
        browser.expect.element('#ajax-register-form > div.auth-error.text-danger').text.to.equal('Неверный пароль')    
    }    
};      