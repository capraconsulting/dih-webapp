import page from './page';

module.exports = Object.create(page, {

    firstname: {
        get() {
            return browser.element('#firstname');
        }
    },

    lastname: {
        get() {
            return browser.element('#lastname');
        }
    },

    birth: {
        get() {
            return browser.element('input#birth');
        }
    },

    email: {
        get() {
            return browser.element('#email');
        }
    },

    submit: {
        value() {
            return browser.click('button#submit');
        }
    },

    messages: {
        get() {
            return browser.elements('#messages');
        }
    },

    open: {
        value() {
            page.open.call(this, '/signup');
        }
    }
});
