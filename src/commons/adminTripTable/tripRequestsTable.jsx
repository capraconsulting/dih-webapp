import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import TripStatusDropdown from './tripStatusDropdown';

class TripRequestsTable extends Component {
    filterTripsByUser(user) {
        if (!user) return this.props.trips;
        return this.props.trips.filter(trip => trip.user.id === user.id);
    }

    render() {
        const trips = this.filterTripsByUser(this.props.user);

        return (
            <table className="ui single line table">
                <thead>
                    <tr key="head">
                        {!this.props.user && <th>First name</th>}
                        {!this.props.user && <th>Last name</th>}
                        <th>Destination</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map(trip => (
                        <tr key={trip.id}>
                            {!this.props.user && <td>{trip.user.firstname}</td>}
                            {!this.props.user && <td>{trip.user.lastname}</td>}
                            <td>{trip.destination.name}</td>
                            <td>{moment(trip.wishStartDate).format('YYYY-MM-DD')}</td>
                            <td>{moment(trip.wishEndDate).format('YYYY-MM-DD')}</td>
                            <td>
                                <TripStatusDropdown trip={trip} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}


TripRequestsTable.propTypes = {
    trips: PropTypes.array.isRequired,
    user: PropTypes.object
};

export default TripRequestsTable;
