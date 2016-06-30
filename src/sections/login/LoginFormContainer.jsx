import React from 'react';

import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
    handleSubmit(data) { // eslint-disable-line
        // TODO: Implement submission handling
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
