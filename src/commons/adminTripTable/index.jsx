import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TripRequestsTable from './tripRequestsTable';
import { list } from '../../actions/tripActions';

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
            <TripRequestsTable trips={this.props.trips} user={this.props.user} />
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

AdminTripTable.propTypes = {
    trips: PropTypes.array.isRequired,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(AdminTripTable);
