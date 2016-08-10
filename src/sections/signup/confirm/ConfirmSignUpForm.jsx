import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Form from '../../../commons/Form';
import InputField from '../../../commons/Form/InputField';
import StaticInputField from '../../../commons/Form/StaticInputField';
import Button from '../../../commons/Button';

const fields = ['password', 'passwordConfirmation'];

const validate = values => {
    const errors = {};
    if (!values) return errors;
    if (!values.password) {
        errors.password = 'Can\'t be blank';
    } else if (values.password.length < 8) {
        errors.password = 'Must have at least 8 characters';
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
        errorMessage,
        isFetching
    } = props;

    return (
        <Form
            id="signUpForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            title="Sign up"
        >
            <StaticInputField
                type="text"
                label="First name"
                value={props.account.firstname}
                disabled
            />
            <StaticInputField
                type="text"
                label="Last
                name"
                value={props.account.lastname}
                disabled
            />
            <StaticInputField
                type="text"
                label="E-mail"
                value={props.account.email}
                disabled
            />
            <InputField type="password" label="Password">
                {password}
            </InputField>
            <InputField type="password" label="Confirm password">
                {passwordConfirmation}
            </InputField>
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

ConfirmSignUpForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'ConfirmSignUpForm',
    fields,
    validate
})(ConfirmSignUpForm);
