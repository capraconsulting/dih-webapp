import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import SignupTripForm from './SignupTripForm';
import Header from '../../../commons/pageHeader';
import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import { create } from '../../../actions/tripActions';
import { list } from '../../../actions/destinationActions';
import { pushNotification } from '../../../actions/notificationActions';

const createHandlers = dispatch => ({
    create(data) {
        return dispatch(create(data));
    },
    list() {
        return dispatch(list());
    },
    notification(message, level) {
        return dispatch(pushNotification(message, level));
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
        if (trip.endDate) {
            const timeDiff = moment(trip.endDate).diff(moment(trip.startDate), 'days');
            const destId = parseInt(trip.destinationId, 10);
            const destination = this.props.destinations.filter(e => e.id === destId)[0];
            if (destination && timeDiff < destination.minimumTripDurationInDays) {
                const msg = `Trip duration has to be longer
                than ${destination.minimumTripDurationInDays} days for this destination.
                If you're unsure of the length of your stay, don't set any end date, and
                explain your situation in the "Additional information" field at the bottom.`;
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
            this.setState({
                errorMessage: error,
                isFetching: false,
                successMessage: success
            });
        });
    }

    renderSignUpForTripForm() {
        if (this.userAllowedToSignUp()) {
            return (
                <SignupTripForm
                    destinations={this.props.destinations.filter(val => (val.isActive))}
                    onSubmit={e => { this.handleSubmit(e); }}
                    errorMessage={this.state.errorMessage}
                    isFetching={this.state.isFetching}
                    successMessage={this.state.successMessage}
                />
            );
        }
        return (
            <div>
                <h3>
                    To register for a trip, you'll have to complete your profile.
                </h3>
                <h3>
                    Go to <Link to="/profile/edit">your profile</Link> and
                    add more information, then come back here.
                </h3>
            </div>
        );
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        icon="plane"
                        subContent={`Sign up for a trip by filling in the form below,
                        we will get back to you for further information as fast as we can!`}
                        content="Sign up for a trip"
                    />
                </Segment>
                <Segment loading={this.state.loading}>
                    {this.renderSignUpForTripForm()}
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
