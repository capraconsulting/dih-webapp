import page from './page';
import { createJwt } from '../helpers';

module.exports = Object.create(page, {

    destinationName: {
        get() {
            const element = browser.elements('input#destinationName');
            element.waitForExist(20000);
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
            element.waitForExist(20000);
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
            return browser.click('button#save');
        }
    },

    open: {
        value() {
            page.open.call(this, `/signup/confirm?jwt=
                ${createJwt({ ...
                    this.currentUser,
                    setPassword: true })
                }`
            );
        }
    }
});
