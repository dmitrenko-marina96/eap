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
            .assert.textContains("h2", "Услуги") 
        },

    'Logout': function(browser) {
        browser
            .click('#dropdownProfile')
            .click('li:nth-child(2) > .dropdown-item')


        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/login/9883124/')
            .assert.titleEquals("EAP")
            .assert.textContains("h1", "Авторизация")
            .expect.element('#ajax-register-form').to.be.visible
    }    
};        