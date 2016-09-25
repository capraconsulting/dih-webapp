import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import Header from '../../../commons/pageHeader';
import Navbar from '../../../commons/navbar';
import { retrieve, update } from '../../../actions/tripActions';
import { pushNotification } from '../../../actions/notificationActions';
import { TRIP_STATUSES } from '../../../constants';
import { getErrorMessageForTripSubmission } from '../../../helpers';


const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(data) {
            return dispatch(update(data));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

/*
* setEmptyDatesToNull - takes a trip objects and sets date values to null if they're an empty string
* Used so that unset values get a clean datepicker, while they're still null if user does not
* change the value.
*
* @function setEmptyDatesToNull
* @param  {Object} dirtyTrip Trip that may have empty stringed dates
* @param  {Object} trip Trip with no empty stringed dates
*/
function setEmptyDatesToNull(dirtyTrip) {
    const trip = dirtyTrip;
    if (trip.startDate === '') trip.startDate = null;
    if (trip.endDate === '') trip.endDate = null;
    if (trip.arrivalDate === '') trip.arrivalDate = null;
    return trip;
}

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true,
            pages: [
                {
                    name: 'View',
                    uri: `/trips/${this.props.params.tripId}`
                },
                {
                    name: 'Edit',
                    uri: `/trips/${this.props.params.tripId}/edit`
                },
                {
                    name: 'Cancel',
                    uri: `/trips/${this.props.params.tripId}/cancel`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    onUpdate(trip) {
        const cleanTrip = setEmptyDatesToNull(trip);
        if (trip.endDate) {
            const msg = getErrorMessageForTripSubmission(trip, this.props.destination);
            if (msg) {
                this.handlers.notification(msg, 'error');
                return;
            }
        }
        this.handlers.update({ ...cleanTrip, id: this.props.params.tripId })
        .then(response => {
            const message = 'Trip changes saved!';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
            if (error) this.handlers.notification('There was a problem. Try again later.', 'error');
        })
        .then(() => this.handlers.retrieve(this.props.params.tripId))
        .then(() => browserHistory.push(`/trips/${this.props.params.tripId}`));
    }

    onCancel() {
        this.handlers.update({ status: TRIP_STATUSES.CLOSED, id: this.props.params.tripId })
        .then(response => {
            const message = 'Trip is canceled.';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
            if (error) this.handlers.notification('There was a problem. Try again later.', 'error');
            browserHistory.push('/trips');
        });
    }

    render() {
        return (
            <Segments loading={this.state.loading}>
                <Segment>
                    <Header
                        icon="plane"
                        content={`${this.props.destination.name ?
                            `Trip to ${this.props.destination.name}` :
                            'Trip with destination yet to be determined'}`}
                        subContent={`View and edit information about your trip.
When the trip gets approved, make sure to add as much additional info as possible`}
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.trip,
                    trip: this.props.trip,
                    destination: this.props.destination,
                    destinations: this.props.destinations,
                    onSubmit: e => this.onUpdate(e),
                    onCancel: e => this.onCancel(e)
                })}
            </Segments>
        );
    }
}


const mapStateToProps = store => ({
    trip: store.tripState.trip,
    destination: store.tripState.trip.destination,
    destinations: store.destinationState.destinations
});

Trip.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    destinations: PropTypes.array.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
