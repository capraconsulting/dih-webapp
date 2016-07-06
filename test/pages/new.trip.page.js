import page from './page';

module.exports = Object.create(page, {

    destinationsSelect: {
        get() {
            return browser.element('#destinationId');
        }
    },

    open: {
        value() {
            page.open.call(this, '/trips/signup');
        }
    },

    wishStartDate: {
        get() {
            const element = browser.element('#wishStartDate');
            element.waitForExist(20000);
            return element;
        }
    },

    wishEndDate: {
        get() {
            const element = browser.element('#wishEndDate');
            element.waitForExist(20000);
            return element;
        }
    },

    destinationsDropdown: {
        value() {
            return browser.click('select#destinationId');
        }
    },

    tripForm: {
        get() {
            const element = browser.element('#signupTripForm');
            element.waitForExist(20000);
            return element;
        }
    },

    submit: {
        value() {
            this.form.submitForm();
        }
    }
});
