import React from 'react';
import { connect } from 'react-redux';

import TripRequests from './TripRequests';

import * as tripsApi from '../../api/trips';

class TripRequestsContainer extends React.Component {

    componentDidMount() {
        tripsApi.getTrips();
    }

    render() {
        return (
            <TripRequests trips={this.props.trips} />
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

TripRequestsContainer.propTypes = {
    trips: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TripRequestsContainer);
