import page from './page';

module.exports = Object.create(page, {

    email: {
        get() {
            return browser.element('#email');
        }
    },

    password: {
        get() {
            return browser.element('#password');
        }
    },

    submit: {
        value() {
            return browser.click('button#submit');
        }
    },

    messages: {
        get() {
            return browser.element('#messages');
        }
    },

    open: {
        value() {
            page.open.call(this, '/login');
        }
    }
});
