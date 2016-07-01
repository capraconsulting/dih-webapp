import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import store from '../../store';
import { login } from '../../actions/authenticationActions';

class LoginFormContainer extends React.Component {

    handleSubmit(data) {
        store.dispatch(login(data));
    }

    render() {
        const { isAuthenticated, errorMessage } = this.props;

        return (
            <LoginForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

LoginFormContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default LoginFormContainer;
