import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { emailIsValid } from '../../helpers';
import Form from '../../commons/Form';
import InputField from '../../commons/Form/InputField';
import Button from '../../commons/Button';

const fields = ['email'];

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailIsValid(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};


function ForgotPasswordForm(props) {
    const {
        fields: { email },
        handleSubmit,
        errorMessage,
        successMessage,
        isFetching
    } = props;

    return (
        <Form
            id="forgotPasswordForm"
            errorMessage={errorMessage}
            successMessage={successMessage}
            handleSubmit={handleSubmit}
            title="Forgot Password"
        >
            <InputField type="email" label="E-mail">
                {email}
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

ForgotPasswordForm.propTypes = {
    fields: PropTypes.object.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'ForgotPasswordForm',
    fields,
    validate
})(ForgotPasswordForm);
