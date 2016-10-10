import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TripsTable from './tripsTable';
import Segment from '../Segment';
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
        this.state = {
            loading: true
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <TripsTable
                    trips={this.props.trips}
                    userId={this.props.userId}
                    destinationId={this.props.destinationId}
                    role={this.props.role}
                    isAdmin
                    statuses={this.props.statuses}
                />
            </Segment>
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

AdminTripTable.propTypes = {
    trips: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    userId: PropTypes.number,
    destinationId: PropTypes.number,
    role: PropTypes.string,
    statuses: PropTypes.array
};

export default connect(mapStateToProps)(AdminTripTable);
