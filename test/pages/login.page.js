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

    open: {
        value() {
            page.open.call(this, '/login');
        }
    }
});
