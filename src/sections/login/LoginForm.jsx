import React from 'react';
import { reduxForm } from 'redux-form';

const fields = ['email', 'password'];

function LoginForm(props) {
    const {
        fields: { email, password },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    const formClass = ['ui', 'form'];
    if (errorMessage) formClass.push('error');
    else formClass.splice(formClass.indexOf('error'), 0);

    const buttonClass = ['ui', 'button', 'primary', 'fluid'];
    if (isFetching) buttonClass.push('loading');
    else buttonClass.splice(buttonClass.indexOf('loading'), 0);

    return (
        <form id="loginForm" className={formClass.join(' ')} onSubmit={handleSubmit}>
            <h2>Log in</h2>
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
            <div id="messages" className="ui error message">
                <p>{errorMessage}</p>
            </div>
            <button
                type="submit"
                className={buttonClass.join(' ')}
                disabled={isFetching}
                id="submit"
            >
                Log in
            </button>
        </form>
    );
}

LoginForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    errorMessage: React.PropTypes.string,
    handleSubmit: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'LoginForm',
    fields
})(LoginForm);
