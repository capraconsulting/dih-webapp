import page from './page';

module.exports = Object.create(page, {

    email: {
        get() {
            return browser.elements('#email');
        }
    },

    password: {
        get() {
            return browser.elements('#password');
        }
    },

    submit: {
        value() {
            return browser.click('button#submit');
        }
    },

    messages: {
        get() {
            return browser.elements('li#message');
        }
    },

    open: {
        value() {
            page.open.call(this, '/login');
        }
    }
});
