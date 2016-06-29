import React from 'react';
import { reduxForm } from 'redux-form';

const fields = ['email', 'password'];

function LoginForm(props) {
    const {
        fields: { email, password },
        handleSubmit,
        submitting
    } = props;

    return (
        <form id="loginForm" className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    {...email}
                />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...password}
                />
            </div>
            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Log in
            </button>
        </form>
    );
}

LoginForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'LoginForm',
    fields
})(LoginForm);
