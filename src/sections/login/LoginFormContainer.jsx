import React from 'react';
import LoginForm from './LoginForm';
import { login } from '../../api/authenticate';

class LoginFormContainer extends React.Component {
    handleSubmit(data) {
        login(data);
    }

    render() {
        return (
            <LoginForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

export default LoginFormContainer;
