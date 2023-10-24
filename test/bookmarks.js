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
    
    'Переход в раздел Юрист': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
           .assert.titleContains('Юридическая поддержка', 'title ok')
           .assert.textContains("h2", "Юридическая поддержка")
           .expect.element('#listingForm > div > div:nth-child(3) > div > div:nth-child(2) > h3 > a').text.to.equal('Гребнева Наталья') // проверка, что данный спец не на 1 месте в списке
        browser   
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible // видимость фильтра
    },

    'Поставить лайк и обновить страницу': function(browser) {
        browser.click('#Bookmark9981007 > button > i') // Гребнева Наталья
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
            .assert.titleContains('Юридическая поддержка', 'title ok')
            .assert.textContains("h2", "Юридическая поддержка")
            .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
            .expect.element('#listingForm > div > div:nth-child(2) > div > div:nth-child(2) > h3 > a').text.to.equal('Гребнева Наталья') // проверка, что после обновления страницы спец, которому поствили сердечко, стал первым в списке
    },

    'Переход в закладки': function(browser) {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('#listing-menu-9882915 > div > div:nth-child(1) > div > div:nth-child(2) > h3').text.to.equal('Гребнева Наталья') // проверка, что спец есть в закладках
    },

    'Переход в спеца из закладок': function(browser) {
        browser.click('#listing-menu-9882915 > div > div:nth-child(1) > div > div.text-center.position-relative.bg-light-plus.rounded > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10141775/page/9981007/')
            .assert.titleContains('Финансовое право', 'title ok')
            .assert.textContains("h2", "Гребнева Наталья")
            .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
    },

    'Назад в закладки': function(browser) {
        browser.click('.d-lg-inline')

         browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('#listing-menu-9882915 > div > div:nth-child(1) > div > div:nth-child(2) > h3').text.to.equal('Гребнева Наталья') // проверка, что спец есть в закладках
    },

    'Поиск по фамилии': function(browser) {
        browser
            .setValue('input[type="text"]', 'Гребнева')
            .click('button[type="submit"]')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("h3", "Гребнева Наталья")
    },

    'Сброс фильтра': function(browser) {
        browser.click('.bi-arrow-repeat')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
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
        browser   
           .expect.element('#listing-menu-9882915').to.be.visible
    },

    'Сброс фильтра 2': function(browser) {
        browser.click('.bi-arrow-repeat')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
    },

    'Поиск по фамилиии и профессии': function(browser) {
        browser
            .setValue('input[type="text"]', 'Гребнева')
            .click('button[class="form-control dropdown-toggle bs-placeholder"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(2)')
            .click('button[type="submit"]')
        
        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("h3", "Гребнева Наталья")
    }, 

    'Сброс фильтра 3': function(browser) {
        browser.click('.bi-arrow-repeat')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
    },

    'Негативный тест поиск по фамилии и профессии': function(browser) {
        browser
            .click('.bi-arrow-repeat')
        browser    
            .setValue('input[type="text"]', 'Гребнева')
            .click('button[class="form-control dropdown-toggle bs-placeholder"]')
            .click('div[class="dropdown-menu show"] > div > ul > li:nth-child(3)')
            .click('button[type="submit"]')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .assert.textContains("#listing-menu-9882915 > div > div", "Информация отсутствует...") 
    },

     'Сброс фильтра 4': function(browser) {
        browser.click('.bi-arrow-repeat')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
    },

    'Убрать лайк и обновить страницу': function(browser) {
        browser.click('#Bookmark9981007 > button > i') // Гребнева Наталья
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('#listing-menu-9882915 > div > div:nth-child(1) > div > div:nth-child(2) > h3').text.to.not.equal('Гребнева Наталья')
    },

    'Перейти в услуги': function(browser) {
        browser.click('.nav-item:nth-child(2) > .nav-link')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('/lk-zabota.pravocard.ru/usluga-10141989')
            .assert.titleContains('Услуги', 'title ok')
            .assert.textContains("h2", "Услуги")
    },

   'Перейти в раздел Юридическая поддержка': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(1) > a')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
           .assert.titleContains('Юридическая поддержка', 'title ok')
           .assert.textContains("h2", "Юридическая поддержка")
           .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-trans' ) // проверка, что сердечко не выделено
           .expect.element('#menu_10030649_page_boxes_1 > div.d-flex.flex-wrap.rounded.bg-light.p-3.listing-panel-search').to.be.visible
    },

     'Поставить лайк и обновить страницу 2': function(browser) {
        browser.click('#Bookmark9981007 > button > i') // Гребнева Наталья
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
            .assert.titleContains('Юридическая поддержка', 'title ok')
            .assert.textContains("h2", "Юридическая поддержка")
            .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
            .expect.element('#listingForm > div > div:nth-child(2) > div > div:nth-child(2) > h3 > a').text.to.equal('Гребнева Наталья') // проверка, что после обновления страницы спец, которому поствили сердечко, стал первым в списке
    },

    'Переход в спеца из списка спецов': function(browser) {
        browser.click('#listingForm > div > div:nth-child(2) > div > div:nth-child(2) > h3 > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/page/9981007/')
            .assert.titleContains('Юридическая поддержка', 'title ok')
            .assert.textContains("h2", "Гребнева Наталья")
            .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-warning text-white' ) // проверка, что сердечко выделено
    },

    'Убрать лайк и обновить страницу 2': function(browser) {
        browser.click('#Bookmark9981007 > button > i') 
        browser.refresh()

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/page/9981007/')
            .assert.titleContains('Юридическая поддержка', 'title ok')
            .assert.textContains("h2", "Гребнева Наталья")
            .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-trans' ) // проверка, что сердечко не выделено
    },

    'Назад в раздел Юридическая поддержка': function(browser) {
        browser.click('.d-lg-inline')

        browser
           .waitForElementVisible('body', 'Заголовок загружен')
           .assert.urlContains('https://lk-zabota.pravocard.ru/usluga-10141989/10030650/?is_parent=1')
           .assert.titleContains('Юридическая поддержка', 'title ok')
           .assert.textContains("h2", "Юридическая поддержка")
           .assert.attributeEquals('#Bookmark9981007 > button','class', 'btn-mark btn btn-sm btn-trans' ) // проверка, что сердечко не выделено       
    },

    'Переход в закладки 2': function(browser) {
        browser.click('.bi-heart')    

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://lk-zabota.pravocard.ru/bookmarks/')
            .assert.titleContains('Избранные специалисты', 'title ok')
            .assert.textContains("h2", "Избранные специалисты")
            .expect.element('#listing-menu-9882915 > div > div:nth-child(1) > div > div:nth-child(2) > h3').text.to.not.equal('Гребнева Наталья')
    }
};
