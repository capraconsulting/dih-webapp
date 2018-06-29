import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { emailIsValid } from '../../helpers';
import Form from '../../commons/Form';
import InputField from '../../commons/Form/InputField';
import Button from '../../commons/Button';
import ToggleField from '../../commons/Form/ToggleField';

const fields = ['email', 'firstname', 'lastname', 'readPrivacyTerms'];

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
    if (!values.readPrivacyTerms) {
        errors.readPrivacyTerms = `Required.
        We cannot handle you in our system if you do not agree witht he privacy terms.`;
    }
    return errors;
};

function SignUpForm(props) {
    const {
        fields: { email, firstname, lastname, readPrivacyTerms },
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
                name="Privacy Policy"
                label={`I agree that my personal information is stored and processed as described in the Privacy
                Policy of A Drop in the Ocean.
                <a target="_blank" 
                href="https://www.drapenihavet.no/en/privacy/">
                Click here to read our Privacy Policy.
                </a>`}
                id="readPrivacyTerms"
                required
            >
                {readPrivacyTerms}
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
