import React, { PropTypes } from 'react';
import Form from '../../commons/Form';
import InputField from '../../commons/Form/InputField';
import Button from '../../commons/Button';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

const fields = ['email', 'password'];

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }
    return errors;
};

function LoginForm(props) {
    const { fields: { email, password }, handleSubmit, errorMessage, isFetching } = props;
    return (
        <Form
            id="loginForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            title="Login"
        >
            <InputField type="email" label="E-mail">
                {email}
            </InputField>
            <InputField type="password" label="Password">
                {password}
            </InputField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Login
            </Button>
            <Link to="/signup">Signup</Link>
            <Link to="/password">Forgot password</Link>
        </Form>
    );
}

LoginForm.propTypes = {
    fields: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'LoginForm',
    fields,
    validate
})(LoginForm);
