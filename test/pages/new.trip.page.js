import page from './page';

module.exports = Object.create(page, {

    destinationsSelect: {
        get() {
            return browser.element('#selectedDestination');
        }
    },

    open: {
        value() {
            page.open.call(this, '/trips/signup');
        }
    },

    wishStartDate: {
        get() {
            const element = browser.elements('#wishStartDate');
            element.waitForExist(20000);
            return element;
        }
    },

    wishEndDate: {
        get() {
            const element = browser.elements('#wishEndDate');
            element.waitForExist(20000);
            return element;
        }
    },

    destinationsDropdown: {
        value() {
            return browser.click('select#selectedDestination');
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
