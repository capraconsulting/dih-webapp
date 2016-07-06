import page from './page';
import * as users from '../fixtures/users.json';
import { getJwt, setUser } from '../userManager';

module.exports = Object.create(page, {
    firstName: {
        get() {
            return browser.elements('#firstName');
        }
    },

    lastName: {
        get() {
            return browser.elements('#lastName');
        }
    },

    dateOfBirth: {
        get() {
            return browser.elements('input#dateOfBirth');
        }
    },

    email: {
        get() {
            return browser.elements('#email');
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
            const user = users[0];
            user.setPassword = true;
            setUser(user);
            page.open.call(this, `/signup/confirm?jwt=${getJwt()}`);
        }
    }
});
