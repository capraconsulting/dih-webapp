import React from 'react';
import moment from 'moment';

import TripStatusDropdown from './TripStatusDropdown';

function TripRequestsTable(props) {
    return (
        <table className="ui single line table">
            <thead>
                <tr key="head">
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Destination</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {props.trips.map(trip => (
                    <tr key={trip.id}>
                        <td>{trip.user.firstname}</td>
                        <td>{trip.user.lastname}</td>
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

TripRequestsTable.propTypes = {
    trips: React.PropTypes.array.isRequired
};

export default TripRequestsTable;
