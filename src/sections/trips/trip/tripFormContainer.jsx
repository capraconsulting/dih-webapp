import React from 'react';
import { connect } from 'react-redux';
import TripForm from './tripForm';
import { retrieve, update } from '../../../actions/tripActions';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(data) {
            return dispatch(update(data));
        }
    }
);

class TripFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.tripId);
    }

    handleSubmit(data) {
        this.handlers.update({ ...data, id: this.props.tripId });
    }

    render() {
        const initialTripValues = {
            initialValues: this.props.trip
        };

        if (!initialTripValues.initialValues.startDate) {
            initialTripValues.initialValues.startDate = this.props.trip.wishStartDate;
        }
        if (!initialTripValues.initialValues.endDate) {
            initialTripValues.initialValues.endDate = this.props.trip.wishEndDate;
        }

        return (
            <TripForm
                {...initialTripValues}
                trip={this.props.trip}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    trip: store.tripState.trip
});

TripFormContainer.propTypes = {
    trip: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    tripId: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(TripFormContainer);
