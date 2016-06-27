import React from 'react';
import { reduxForm } from 'redux-form';

const fields = ['password', 'passwordConfirmation'];

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
            <label htmlFor="passwordConfirmation">Confirm password</label>
            <input
                type="password"
                id="passwordConfirmation"
                {...passwordConfirmation}
            />
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
    fields
})(ConfirmSignUpForm);
