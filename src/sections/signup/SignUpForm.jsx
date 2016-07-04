import React, { PropTypes } from 'react';
import DataPicker from 'react-datepicker';
import { connect } from 'react-redux';
// @TODO
// This should be generalized and moved to a component for better reuse
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import _ from 'lodash';

import { create } from '../../actions/userActions';

const createHandlers = (dispatch) => (
    {
        create(user) {
            return dispatch(create(user));
        }
    }
);

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            birth: null,
            messages: []
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleFirstNameChange(e) {
        this.setState({ firstname: e.target.value });
    }

    handleLastNameChange(e) {
        this.setState({ lastname: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handleDateOfBirthChange(date) {
        this.setState({ birth: date });
    }

    handleSubmit(e) {
        e.preventDefault();

        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const birth = this.state.birth;

        const errors = [];

        if (!firstname.length) {
            errors.push('First name can\'t be blank');
        }

        if (!lastname.length) {
            errors.push('Last name can\'t be blank');
        }

        if (!email.length) {
            errors.push('E-mail name can\'t be blank');
        }

        if (!birth) {
            errors.push('Date of birth name can\'t be blank');
        } else if (moment().subtract(25, 'years').isBefore(birth)) {
            errors.push('You must be at least 25 years old to participate');
        }

        if (errors.length > 0) {
            this.setState({ messages: errors });
            return;
        }

        this.handlers.create({
            firstname,
            lastname,
            email,
            birth
        })
        .then(() => {
            this.setState({
                firstname: '',
                lastname: '',
                email: '',
                birth: null,
                messages: []
            });
        })
        .catch(err => {
            errors.push(err.message);
            this.setState({ messages: errors });
        });
    }

    renderErrors() {
        if (!_.isEmpty(this.state.messages)) {
            return (
                <div className="ui message negative">
                    <ul>
                        {this.state.messages.map(message =>
                            <li id="message">{message}</li>
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
                <h2>Sign up</h2>
                {this.renderErrors()}
                <div className="field">
                    <label htmlFor="firstname">First name</label>
                    <input
                        type="text"
                        id="firstname"
                        value={this.state.firstname}
                        onChange={event => { this.handleFirstNameChange(event); }}
                    />
                </div>
                <div className="field">
                    <label htmlFor="lastname">Last name</label>
                    <input
                        type="text"
                        id="lastname"
                        value={this.state.lastname}
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
                    <label htmlFor="birth">Date of birth (DD/MM/YYYY)</label>
                    <DataPicker
                        id="birth"
                        selected={this.state.birth}
                        onChange={event => { this.handleDateOfBirthChange(event); }}
                        locale="en-gb"
                    />
                </div>
                <button id="submit" className="ui button primary" type="submit">Sign up</button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect()(SignUpForm);
