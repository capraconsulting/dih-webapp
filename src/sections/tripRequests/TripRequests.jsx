import React from 'react';

function TripRequests(props) {
    return (
        <table className="ui single line table">
            <thead>
                <tr>
                    <th>Volunteer</th>
                    <th>Destination</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.trips.map(trip => (
                    <tr key={trip.id}>
                        <td>{trip.userId}</td>
                        <td>{trip.destinationId}</td>
                        <td>{trip.wishStartDate}</td>
                        <td>{trip.wishEndDate}</td>
                        <td>{trip.status}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

TripRequests.propTypes = {
    trips: React.PropTypes.array.isRequired
};

export default TripRequests;
