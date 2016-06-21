import page from './page';

module.exports = Object.create(page, {

    name: {
        get() {
            const element = browser.elements('#destinationName');
            element.waitForExist(2000);
            return element;
        }
    },

    destinations: {
        get() {
            return browser.elements('li#destination');
        }
    },

    form: {
        get() {
            const element = browser.elements('#newDestinationForm');
            element.waitForExist(2000);
            return element;
        }
    },

    submit: {
        value() {
            this.form.submitForm();
        }
    },

    save: {
        value() {
            return browser.click('button#submit');
        }
    },

    open: {
        value() {
            page.open.call(this, '/admin/destinations');
        }
    }
});
