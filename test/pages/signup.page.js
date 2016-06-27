import page from './page';

module.exports = Object.create(page, {

    firstname: {
        get() {
            return browser.elements('#firstname');
        }
    },

    lastname: {
        get() {
            return browser.elements('#lastname');
        }
    },

    birth: {
        get() {
            return browser.elements('input#birth');
        }
    },

    email: {
        get() {
            return browser.elements('#email');
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
            page.open.call(this, '/signup');
        }
    }
});
