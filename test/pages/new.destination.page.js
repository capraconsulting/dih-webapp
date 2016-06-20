import page from './page';

module.exports = Object.create(page, {

    name: {
        get() {
            return browser.elements('#destinationName');
        }
    },

    form: {
        get() {
            return browser.elements('#newDestinationForm');
        }
    },

    submit: {
        value() {
            this.form.submitForm();
        }
    },

    open: {
        value() {
            page.open.call(this, '/admin/destinations');
        }
    }
});
