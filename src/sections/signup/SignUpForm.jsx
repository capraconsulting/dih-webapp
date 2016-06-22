import React from 'react';
import DataPicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: null,
            messages: []
        };
    }

    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }

    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleDateOfBirthChange(date) {
        this.setState({ dateOfBirth: date });
    }

    handleSubmit(e) {
        e.preventDefault();

        const newFirstName = this.state.firstName;
        const newLastName = this.state.lastName;
        const newEmail = this.state.email;
        const newDateOfBirth = this.state.dateOfBirth;

        const newErrorMessages = [];

        if (newFirstName.length === 0) {
            newErrorMessages.push('First name can\'t be blank');
        }

        if (newLastName.length === 0) {
            newErrorMessages.push('Last name can\'t be blank');
        }

        if (newEmail.length === 0) {
            newErrorMessages.push('E-mail name can\'t be blank');
        }

        if (newDateOfBirth === null) {
            newErrorMessages.push('Date of birth name can\'t be blank');
        } else if (moment().subtract(25, 'years').isBefore(newDateOfBirth)) {
            newErrorMessages.push('You must be at least 25 years old to participate');
        }

        if (newErrorMessages.length > 0) {
            this.setState({ messages: newErrorMessages });
            return;
        }

        // @TODO Push to server
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: null,
            messages: []
        });
    }

    renderErrors() {
        if (!_.isEmpty(this.state.messages)) {
            return (
                <div className="ui message negative">
                    <ul>
                        {this.state.messages.map(message =>
                            <li>{message}</li>
                        )}
                    </ul>
                </div>
            );
        }
        return <div></div>;
    }

    render() {
        return (
            <form
                id="signUpForm"
                className="ui form"
                onSubmit={event => { this.handleSubmit(event); }}
            >
                {this.renderErrors()}
                <div className="field">
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={event => { this.handleFirstNameChange(event); }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="lastName">Last name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={event => { this.handleLastNameChange(event); }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={event => { this.handleEmailChange(event); }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="dateOfBirth">Date of birth (DD/MM/YYYY)</label>
                    <DataPicker
                        id="dateOfBirth"
                        selected={this.state.dateOfBirth}
                        onChange={event => { this.handleDateOfBirthChange(event); }}
                        locale="en-gb"
                    />
                </div>
                <button className="ui button primary" type="submit">Sign up</button>
            </form>
        );
    }
}

export default SignUpForm;
