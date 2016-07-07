import React from 'react';
import { connect } from 'react-redux';
import TripForm from './tripForm';
import { retrieve } from '../../../actions/tripActions';


class TripFormContainer extends React.Component {
    constructor(props) {
        super(props);
        const createHandlers = (dispatch) => () =>
            dispatch(retrieve(this.props.tripId)
        );
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    handleSubmit(data) {
        console.log(data);
    }

    render() {
        return (
            <TripForm
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
