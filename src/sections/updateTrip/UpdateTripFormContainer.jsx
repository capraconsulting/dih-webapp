import React from 'react';
import { connect } from 'react-redux';
import UpdateTripForm from './UpdateTripForm';
import { retrieve } from '../../actions/tripActions';


class UpdateTripFormContainer extends React.Component {
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
            <UpdateTripForm
                trip={this.props.trip}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    trip: store.tripState.trip
});

UpdateTripFormContainer.propTypes = {
    trip: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    tripId: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(UpdateTripFormContainer);
