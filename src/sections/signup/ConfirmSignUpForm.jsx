import React from 'react';
import { reduxForm } from 'redux-form';

const fields = ['password', 'passwordConfirmation'];

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Can\'t be blank';
    } else if (values.password.length < 8) {
        errors.password = 'Must have at least 8 characters';
    } else if (values.password.length > 100) {
        errors.password = 'Must have at most 100 characters';
    }

    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Can\'t be blank';
    } else if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Does not match against password';
    }

    return errors;
};

function ConfirmSignUpForm(props) {
    const {
        fields: { password, passwordConfirmation },
        handleSubmit,
        submitting
    } = props;

    return (
        <form id="confirmSignUpForm" className="ui form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First name</label>
            <input
                type="text"
                id="firstName"
                value="Adrian Alexander"
                disabled
            />
            <label htmlFor="lastName">Last name</label>
            <input
                type="text"
                id="lastName"
                value="Eriksen"
                disabled
            />
            <label htmlFor="email">E-mail</label>
            <input
                type="email"
                id="email"
                value="adrian@example.com"
                disabled
            />
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
                type="text"
                id="dateOfBirth"
                dateFormat="YYYY-MM-DD"
                placeholderText="YYYY-MM-DD"
                value="1993-10-10"
                disabled
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                {...password}
            />
            {password.touched && password.error && <div>{password.error}</div>}
            <label htmlFor="passwordConfirmation">Confirm password</label>
            <input
                type="password"
                id="passwordConfirmation"
                {...passwordConfirmation}
            />
            {passwordConfirmation.touched && passwordConfirmation.error &&
                <div>{passwordConfirmation.error}</div>}
            <br />
            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Set password
            </button>
        </form>
    );
}

ConfirmSignUpForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'ConfirmSignUpForm',
    fields,
    validate
})(ConfirmSignUpForm);
