module.exports = {
    '@tags': ['bookmark'],
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

    'Добавить услугу в избранное': function(browser) {
        browser.click('#Bookmark10030653 > button > i') // Психолог
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
            .assert.attributeEquals('#Bookmark10030653 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
    },

    'Переход в закладки': function(browser) {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').to.be.visible

        browser.expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').text.to.equal('Услуги 1') 
    },  

    'Переход в Избранные услуги': function(browser) {
        browser.click('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/?nav_filter=10030649')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('#listing-menu-9882915 > div > div > div > div > a > h4').text.to.equal('Психолог') // проверка, что добавленная услуга есть в избранном
    },  

    'Переход в Услуги': function(browser) {
        browser.click('.nav-item:nth-child(2) > .nav-link')

         browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")  
    },

    'Переход в услугу': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(6) > div > a') // Помощь по дому

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206059/?is_parent=1')
            .assert.titleContains('Помощь по дому', 'title ok')
            .assert.textContains("h2", "Помощь по дому")
            .assert.textContains(".househelper", "Помощь по дому")
            .assert.textContains(".housemaster", "Выезд мастера по дому")
            .assert.textContains(".cleaning", "Клининг")
    },

    'Добавить услугу в избранное 2': function(browser) {
        browser.click('#Bookmark10145016 > button > i') // Выезд мастера по дому
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10206059/?is_parent=1')
            .assert.titleContains('Помощь по дому', 'title ok')
            .assert.textContains("h2", "Помощь по дому")
            .assert.attributeEquals('#Bookmark10145016 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
    },  

    'Переход в закладки 2': function(browser) {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').to.be.visible

        browser.expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').text.to.equal('Услуги 2') // проверка, что услуг стало 2
    },  

    'Переход в Избранные услуги 2': function(browser) {
        browser.click('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/?nav_filter=10030649')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            
        browser.expect.element('#listing-menu-9882915 > div > div > div:nth-child(1) > div > a > h4').text.to.equal('Выезд мастера по дому') // проверка, что добавленная услуга есть в избранном
        browser.expect.element('#listing-menu-9882915 > div > div > div:nth-child(2) > div > a > h4').text.to.equal('Психолог') // проверка, что добавленная услуга есть в избранном
    }, 

    'Удалить услугу из избранного': function(browser) {
        browser.click('#Bookmark10145016 > button > i') // Выезд мастера по дому
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/?nav_filter=10030649')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('#listing-menu-9882915 > div > div > div > div > a > h4').text.to.equal('Психолог') // проверка, что добавленная услуга есть в избранном

         browser.expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').text.to.equal('Услуги 1') // проверка, что услуг стало 1    
    },

    'Переход в Услуги 2': function(browser) {
        browser.click('.nav-item:nth-child(2) > .nav-link')

         browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")      
    },

    'Удалить услугу из избранного 2': function(browser) {
        browser.click('#Bookmark10030653 > button > i') // Психолог
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
            .assert.attributeEquals('#Bookmark10030653 > button','class', 'btn-mark btn btn-sm btn-trans' ) // проверка, что сердечко не выделено
    },

    'Добавить услугу в избранное 3': function(browser) {
        browser.click('#Bookmark10030655 > button > i') // Финансист
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
            .assert.attributeEquals('#Bookmark10030655 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
    },

    'Переход в закладки 3': function(browser) {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            .expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').to.be.visible

        browser.expect.element('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)').text.to.equal('Услуги 1')     
    },

    'Переход в Избранные услуги 3': function(browser) {
        browser.click('div.d-flex.flex-wrap.flex-xl-nowrap > a:nth-child(2)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/?nav_filter=10030649')
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
            
        browser.expect.element('#listing-menu-9882915 > div > div > div > div > a > h4').text.to.equal('Финансист') // проверка, что добавленная услуга есть в избранном
    }, 

    'Удалить услугу из избранного 3': function(browser) {
        browser.click('#Bookmark10030655 > button > i') // Финансист
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/?nav_filter=10030649') // открывается страница со специалистами
            .assert.titleContains('Избранное', 'title ok')
            .assert.textContains("h2", "Избранное")
    }        
};        