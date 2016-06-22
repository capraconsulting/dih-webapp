import React from 'react';

class ConfirmSignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: 'Adrian Alexander',
            lastName: 'Eriksen',
            email: 'adrian@example.com',
            dateOfBirth: '10/10/1993',
            password: '',
            passwordConfirmation: '',
            messages: []
        };
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handlePasswordConfirmationChange(e) {
        this.setState({ passwordConfirmation: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const newPassword = this.state.password;
        const newPasswordConfirmation = this.state.passwordConfirmation;

        const errorMessages = [];

        if (newPassword.length === 0) {
            errorMessages.push('Password can\'t be blank');
        } else if (newPassword.length < 8) {
            errorMessages.push('Password must have at least 8 characters');
        } else if (newPassword.length > 100) {
            errorMessages.push('Password must have at most 100 characters');
        }

        if (newPasswordConfirmation.length === 0) {
            errorMessages.push('Confirm password can\'t be blank');
        } else if (newPassword !== newPasswordConfirmation) {
            errorMessages.push('Password confirmation does not match password');
        }

        if (errorMessages.length > 0) {
            this.setState({
                password: '',
                passwordConfirmation: '',
                messages: errorMessages
            });
            return;
        }

        // @TODO Push to server

        this.setState({
            password: '',
            passwordConfirmation: '',
            messages: []
        });
    }

    render() {
        return (
            <form id="confirmSignUpForm" onSubmit={event => { this.handleSubmit(event); }}>
                <div className="error">
                    <ul>
                        {this.state.messages.map(message =>
                            <li>{message}</li>
                        )}
                    </ul>
                </div>
                <label htmlFor="firstName">First name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={this.state.firstName}
                    disabled
                />
                <label htmlFor="lastName">Last name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={this.state.lastName}
                    disabled
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    disabled
                />
                <label htmlFor="dateOfBirth">Date of birth <em>DD/MM/YYYY</em>:</label>
                <input
                    type="text"
                    id="dateOfBirth"
                    value={this.state.dateOfBirth}
                    disabled
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={event => { this.handlePasswordChange(event); }}
                />
                <label htmlFor="passwordConfirmation">Confirm password:</label>
                <input
                    type="password"
                    id="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    onChange={event => { this.handlePasswordConfirmationChange(event); }}
                />
                <br />
                <button type="submit">Set password</button>
            </form>
        );
    }
}

export default ConfirmSignUpForm;
