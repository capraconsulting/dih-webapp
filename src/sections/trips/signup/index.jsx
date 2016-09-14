import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import SignupTripForm from './SignupTripForm';
import Header from '../../../commons/pageHeader';
import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import { create } from '../../../actions/tripActions';
import { list } from '../../../actions/destinationActions';
import { pushNotification } from '../../../actions/notificationActions';
import { getErrorMessageForTripSubmission } from '../../../helpers';
import { reset } from 'redux-form';

const createHandlers = dispatch => ({
    create(data) {
        return dispatch(create(data));
    },
    list() {
        return dispatch(list());
    },
    notification(message, level) {
        return dispatch(pushNotification(message, level));
    },
    reset(name) {
        return dispatch(reset(name));
    }
});

class SignupTripFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true,
            errorMessage: null,
            successMessage: null
        };
    }

    componentDidMount() {
        this.handlers.list()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    userAllowedToSignUp() {
        const account = this.props.account;
        return account.readTerms && account.firstname &&
               account.lastname && account.birth && account.volunteerInfo;
    }

    handleSubmit(data) {
        this.setState({
            isFetching: true
        });
        const trip = data;
        trip.wishStartDate = data.startDate; // Cannot be null. Field is not used anymore.
        if (trip.endDate.length === 0) delete trip.endDate;
        if (trip.endDate && trip.destinationId) {
            const destId = parseInt(trip.destinationId, 10);
            const destination = this.props.destinations.filter(e => e.id === destId)[0];
            const msg = getErrorMessageForTripSubmission(trip, destination);
            if (msg) {
                this.setState({
                    isFetching: false,
                    errorMessage: msg,
                    successMessage: null
                });
                return;
            }
        }
        this.handlers.create(trip)
        .then(response => {
            let success = null;
            const { error } = response;
            if (!error) {
                success = `We have registered your trip request and
                will respond by email as soon as possible.`;
            }
            this.handlers.reset('SignupTripForm');
            this.setState({
                errorMessage: error,
                isFetching: false,
                successMessage: success
            });
            browserHistory.push('/trips');
        });
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        icon="plane"
                        subContent={`
                            Sign up for a trip by filling in the form below.
                            We will reply to your request within a few days.
                            Note that your trip is not approved until you receive
                            an approval email from our administrators!`}
                        content="Sign up for a trip"
                    />
                </Segment>
                <Segment loading={this.state.loading} blue>
                    {this.userAllowedToSignUp() &&
                        <SignupTripForm
                            destinations={this.props.destinations.filter(val => (val.isActive))}
                            onSubmit={e => { this.handleSubmit(e); }}
                            errorMessage={this.state.errorMessage}
                            isFetching={this.state.isFetching}
                            successMessage={this.state.successMessage}
                        />
                    }
                    {!this.userAllowedToSignUp() &&
                        <div>
                            <h3>We would like to know you better!</h3>
                            <p>
                                Before you can sign up for a trip, you will have to fill out
                                some information about yourself.
                            </p>
                            <p>
                                Go to <Link to="/profile/edit">your profile</Link> and
                                add more information, then come back here.
                            </p>
                        </div>
                    }
                </Segment>
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations,
    account: store.accountState.account
});

SignupTripFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SignupTripFormContainer);
