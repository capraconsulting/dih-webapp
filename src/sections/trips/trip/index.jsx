import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../commons/pageHeader';
import Navbar from '../../../commons/navbar';
import { retrieve, update } from '../../../actions/tripActions';
import { retrieve as retrieveDestination } from '../../../actions/destinationActions';
import { pushNotification } from '../../../actions/notificationActions';

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
        },
        retrieveDestination(id) {
            return dispatch(retrieveDestination(id));
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
    if (trip.departureDate === '') trip.departureDate = null;
    return trip;
}

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'View',
                    uri: `/trips/${this.props.params.tripId}`
                },
                {
                    name: 'Edit',
                    uri: `/trips/${this.props.params.tripId}/edit`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId)
        .then(() => this.handlers.retrieveDestination(this.props.trip.destinationId));
    }

    onUpdate(trip) {
        const cleanTrip = setEmptyDatesToNull(trip);
        this.handlers.update({ ...cleanTrip, id: this.props.params.tripId })
        .then(response => {
            const message = 'Trip changes saved!';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
            if (error) this.handlers.notification('There was a problem. Try again later.', 'error');
        })
        .then(() => this.handlers.retrieve(this.props.params.tripId));
    }

    render() {
        return (
            <div className="ui segment clearing">
                <Header
                    icon="plane"
                    content={`Trip to ${this.props.destination.name}`}
                    subContent="Manage your trip"
                />
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.trip,
                    trip: this.props.trip,
                    onSubmit: (e) => this.onUpdate(e)
                })}
            </div>
        );
    }
}


const mapStateToProps = store => ({
    trip: store.tripState.trip,
    destination: store.destinationState.destination
});

Trip.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
