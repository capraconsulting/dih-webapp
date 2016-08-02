import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TripRequestsTable from './tripRequestsTable';
import { list } from '../../actions/tripActions';

/*
* commons.adminTripTable
*
* trips - array: The list of all trips that should be displayed in the table
*
* userId - number (optional): The id of a user. By adding this only trips made by
* this user will be shown. In addition, the 'first/last name' columns will be hidden
*
* destinationId - number (optional): The id of a destination. By adding this only trips to
* this destination will be shown. In addition, the 'destination' column will be hidden
*/

const createHandlers = (dispatch) => () => dispatch(list());

class AdminTripTable extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        return (
            <TripRequestsTable
                trips={this.props.trips}
                userId={this.props.userId}
                destinationId={this.props.destinationId}
            />
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

AdminTripTable.propTypes = {
    trips: PropTypes.array.isRequired,
    userId: PropTypes.number,
    destinationId: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(AdminTripTable);
