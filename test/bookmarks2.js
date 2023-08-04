//проверки перехода в Избранное из Услуг и поиск спеца по профессии и по фамилии

//предварительно добавить юриста в избранное - Иванов Иван

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

    'Переход в избранное': function(browser) {
        browser.click('.bi-heart')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('.listing-panel-search').to.be.visible
    },

    'Поиск по профессии': function(browser) {  
        browser
            .click('button[class="form-control dropdown-toggle bs-placeholder"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2)')
            .click('button[type="submit"]')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('div[class="dropdown bootstrap-select form-control"] > button > div > div > div').text.to.equal('Юрист')
            //.expect.element('#listing-menu-9882915').to.be.visible
    },

    'Сброс фильтра': function(browser) {
        browser.click('.bi-arrow-repeat')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('.listing-panel-search').to.be.visible
    },

    'Поиск по фамилии': function(browser) {
        browser
            .setValue('input[type="text"]', 'Иванов')
            .click('button[type="submit"]')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("h3", "Иванов Иван")   
    },

    'Поиск по фамилиии и профессии': function(browser) {
        browser
            .setValue('input[type="text"]', 'Иванов')
            .click('button[class="form-control dropdown-toggle bs-placeholder"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2)')
            .click('button[type="submit"]')
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("h3", "Иванов Иван")
    },

    'Негативный тест поиск по фамилии и профессии': function(browser) {
        browser
            .click('.bi-arrow-repeat')
        browser    
            .setValue('input[type="text"]', 'Иванов')
            .click('button[class="form-control dropdown-toggle bs-placeholder"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(3)')
            .click('button[type="submit"]')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("#listing-menu-9882915 > div > div", "Информация отсутствует...") 
    }       
};        