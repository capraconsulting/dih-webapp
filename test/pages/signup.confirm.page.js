import page from './page';

module.exports = Object.create(page, {
    firstName: {
        get() {
            return browser.elements('#firstName');
        }
    },

    lastName: {
        get() {
            return browser.elements('#lastName');
        }
    },

    dateOfBirth: {
        get() {
            return browser.elements('input#dateOfBirth');
        }
    },

    email: {
        get() {
            return browser.elements('#email');
        }
    },

    password: {
        get() {
            return browser.element('#password');
        }
    },

    passwordConfirmation: {
        get() {
            return browser.element('#passwordConfirmation');
        }
    },

    submit: {
        value() {
            return browser.click('button#submit');
        }
    },

    messages: {
        get() {
            return browser.elements('.errors');
        }
    },

    open: {
        value() {
            page.open.call(this, '/signup/confirm');
        }
    }
});
