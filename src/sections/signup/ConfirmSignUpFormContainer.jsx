import React from 'react';

import ConfirmSignUpForm from './ConfirmSignUpForm';

class ConfirmSignUpFormContainer extends React.Component {
    handleSubmit(data) { // eslint-disable-line
        // TODO Connect with API call from the future
        console.log('handler called');
    }

    validate(values) {
        const errors = {};

        if (values.newPassword.length === 0) {
            errors.newPassword = 'Can\'t be blank';
        } else if (values.newPassword.length < 8) {
            errors.newPassword = 'Must have at least 8 characters';
        } else if (values.newPassword.length > 100) {
            errors.newPassword = 'Must have at most 100 characters';
        }

        if (errors.newPasswordConfirmation.length === 0) {
            errors.newPassword = 'Can\'t be blank';
        } else if (errors.newPassword !== errors.newPasswordConfirmation) {
            errors.newPassword = 'Does not match against password';
        }

        return errors;
    }

    render() {
        return (
            <ConfirmSignUpForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

export default ConfirmSignUpFormContainer;
