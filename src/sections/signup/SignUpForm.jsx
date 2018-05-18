import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { emailIsValid } from '../../helpers';
import Form from '../../commons/Form';
import InputField from '../../commons/Form/InputField';
import Button from '../../commons/Button';
import ToggleField from '../../commons/Form/ToggleField';

const fields = ['email', 'firstname', 'lastname', 'agreesToPrivacyTerms'];

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailIsValid(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.lastname) {
        errors.lastname = 'Required';
    }
    if (!values.firstname) {
        errors.firstname = 'Required';
    }
    if (!values.agreesToPrivacyTerms) {
        errors.agreesToPrivacyTerms = `Required.
        We cannot handle you in our system if you do not agree witht he privacy terms.`;
    }
    return errors;
};

function SignUpForm(props) {
    const {
        fields: { email, firstname, lastname, agreesToPrivacyTerms },
        handleSubmit,
        errorMessage,
        successMessage,
        isFetching
    } = props;

    return (
        <Form
            id="signUpForm"
            errorMessage={errorMessage}
            successMessage={successMessage}
            handleSubmit={handleSubmit}
            title="Sign up"
        >
            <InputField type="text" label="First name">
                {firstname}
            </InputField>
            <InputField type="text" label="Last name">
                {lastname}
            </InputField>
            <InputField type="email" label="E-mail">
                {email}
            </InputField>
            <ToggleField
                name="Privacy Guidelines"
                label={`I confirm that I have read and agree to the privacy terms 
                of A Drop in the Ocean.
                <a target="_blank" 
                href="https://docs.google.com/document/d/e/2PACX-1vTLztU4EHLkqUBnLFc9pTcvH5AWWm76ItkB7Vwnhb-Tic5AFPyxbl9-yBvxJlLSRKfq_ak9snbiEbm0/pub">
                Click here to read the terms.
                </a>`}
                id="readPrivacyTerms"
                required
            >
                {agreesToPrivacyTerms}
            </ToggleField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Sign up
            </Button>
            <Link to="/login">Login</Link>
            <Link to="/password">Forgot password</Link>
        </Form>
    );
}

SignUpForm.propTypes = {
    fields: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'SignUpForm',
    fields,
    validate
})(SignUpForm);
