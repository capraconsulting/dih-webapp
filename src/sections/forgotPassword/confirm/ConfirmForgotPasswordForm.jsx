import React from 'react';
import Form from '../../../commons/Form';
import InputField from '../../../commons/Form/InputField';
import Button from '../../../commons/Button';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

const fields = ['password', 'controlPassword'];

const validate = values => {
    const errors = {};
    if (values.password !== values.controlPassword) {
        errors.controlPassword = 'Has to be the same as the password field.';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }
    return errors;
};

function ConfirmForgotPasswordForm(props) {
    const {
        fields: { password, controlPassword },
        handleSubmit,
        errorMessage,
        successMessage,
        isFetching
    } = props;

    return (
        <Form
            id="forgotPasswordConfirmForm"
            errorMessage={errorMessage}
            successMessage={successMessage}
            handleSubmit={handleSubmit}
            title="Reset Password"
        >
            <InputField type="password" label="Password">
                {password}
            </InputField>
            <InputField type="password" label="Repeat password">
                {controlPassword}
            </InputField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Reset password
            </Button>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </Form>
    );
}

ConfirmForgotPasswordForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    errorMessage: React.PropTypes.string,
    successMessage: React.PropTypes.string,
    handleSubmit: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool
};

export default reduxForm({
    form: 'ConfirmForgotPasswordForm',
    fields,
    validate
})(ConfirmForgotPasswordForm);
