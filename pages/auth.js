const authCommands = {
    login(email, password) {
        this
            .setValue('@inputEmail', email)
            .setValue('@inputPassword', password)
            .click('@btn')
        return this;        
    }  
}

module.exports = {
    url: 'https://lk-zabota.pravocard.ru/login/',
    commands: [authCommands],
    elements: {
        inputEmail: '#inputEmail',
        inputPassword: '#inputPassword',
        btn: '#ajax-register-form button'
    }
}            