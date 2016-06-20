import React from 'react';
import DataPicker from 'react-datepicker';
import moment from 'moment';

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: null,
            message: ''
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

        if (!newFirstName) {
            return;
        }

        if (!newLastName) {
            return;
        }

        if (!newEmail) {
            return;
        }

        if (!newDateOfBirth) {
            return;
        }

        if (moment().subtract(25, 'years').isBefore(newDateOfBirth)) {
            this.setState({
                message: 'You must be at least 25 years old to participate!'
            });
            return;
        }

        // @TODO Push to server
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: null,
            message: ''
        });
    }

    render() {
        return (
            <form id="signUpForm" onSubmit={this.handleSubmit}>
                <div className="error">{this.state.message}</div>
                <label htmlFor="firstName">First name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange}
                />
                <label htmlFor="lastName">Last name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange}
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <label htmlFor="dateOfBirth">Date of birth <em>DD/MM/YYYY</em>:</label>
                <DataPicker
                    id="dateOfBirth"
                    selected={this.state.dateOfBirth}
                    onChange={this.handleDateOfBirthChange}
                    locale="en-gb"
                />
                <br />
                <button type="submit">Sign up</button>
            </form>
        );
    }
}

export default SignUpForm;
