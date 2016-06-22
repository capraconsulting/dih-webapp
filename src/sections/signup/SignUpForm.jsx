import React from 'react';
import DataPicker from 'react-datepicker';
import moment from 'moment';

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

        console.log(this.state);

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

    render() {
        return (
            <form id="signUpForm" onSubmit={event => { this.handleSubmit(event); }}>
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
                    onChange={event => { this.handleFirstNameChange(event); }}
                />
                <label htmlFor="lastName">Last name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={event => { this.handleLastNameChange(event); }}
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={event => { this.handleEmailChange(event); }}
                />
                <label htmlFor="dateOfBirth">Date of birth <em>DD/MM/YYYY</em>:</label>
                <DataPicker
                    id="dateOfBirth"
                    selected={this.state.dateOfBirth}
                    onChange={event => { this.handleDateOfBirthChange(event); }}
                    locale="en-gb"
                />
                <br />
                <button type="submit">Sign up</button>
            </form>
        );
    }
}

export default SignUpForm;
