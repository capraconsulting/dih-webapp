import page from './page';
import { createJwt } from '../helpers';

module.exports = Object.create(page, {
    firstName: {
        get() {
            return browser.element('#firstName');
        }
    },

    lastName: {
        get() {
            return browser.element('#lastName');
        }
    },

    dateOfBirth: {
        get() {
            return browser.element('input#dateOfBirth');
        }
    },

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

    passwordConfirmation: {
        get() {
            return browser.element('#passwordConfirmation');
        }
    },

    submit: {
        value() {
            return browser.click('button#submit');
        }
    },

    messages: {
        get() {
            return browser.elements('.errors');
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
