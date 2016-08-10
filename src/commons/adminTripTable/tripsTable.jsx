import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { USER_ROLES, TRIP_STATUS_LABELS, TRIP_STATUSES } from '../../constants';
import Table from '../../commons/table';

class TripRequestsTable extends Component {
    constructor(props) {
        super(props);
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.rowCounterLabels = { prefix: 'Showing', suffix: 'trips' };
    }
    getTrips() {
        let trips = this.props.trips;
        if (this.props.userId) {
            trips = this.filterTripsByUser(trips, this.props.userId);
        }
        if (this.props.destinationId) {
            trips = this.filterTripsByDestination(trips, this.props.destinationId);
        }
        return trips;
    }

    filterTripsByUser(trips, userId) {
        return trips.filter(trip => trip.user.id === userId);
    }

    filterTripsByDestination(trips, destinationId) {
        return trips.filter(trip => trip.destinationId === destinationId);
    }

    prepareTableHeaders() {
        const headers = {};
        if (!this.props.userId) {
            headers.fullName = 'Name';
            headers.phoneNumber = 'Phone number';
        }

        if (!this.props.destinationId) {
            headers.destination = 'Destination';
        }

        headers.startDate = 'Start date';
        headers.endDate = 'End date';
        headers.status = 'Status';
        return headers;
    }

    prepareLinkPrefix() {
        if (this.props.role === USER_ROLES.MODERATOR) {
            return '/coordinator/users/';
        }
        return '/admin/users/';
    }

    prepareTableContent(trips) {
        let filteredTrips = trips;
        if (this.props.requestsOnly) {
            filteredTrips = trips.filter(trip => (trip.status === TRIP_STATUSES.PENDING));
        }

        return filteredTrips.map(trip => {
            const row = {
                id: trip.id,
                userId: trip.userId,
                startDate: moment(trip.startDate).format('YYYY-MM-DD'),
                endDate: trip.endDate ? moment(trip.endDate).format('YYYY-MM-DD') : 'Not set',
                status: trip.status
            };

            if (!this.props.userId) {
                row.fullName = trip.user.fullName;
                row.phoneNumber = trip.user.phoneNumber;
            }

            if (!this.props.destinationId) {
                row.destination = trip.destination.name;
            }

            return row;
        });
    }

    linkElement() {
        if (!this.props.userId) {
            return {
                columnName: 'fullName',
                prefix: this.prepareLinkPrefix(),
                suffix: '/trips'
            };
        }
        return {
            columnName: 'destination',
            prefix: '/trips/'
        };
    }

    render() {
        const trips = this.getTrips();
        return (
            <Table
                search
                responsivePriority={[
                    'fullName',
                    'destination',
                    'status',
                    'phoneNumber',
                    'startDate',
                    'endDate'
                ]}
                dateFields={this.dateFields}
                rowCounter={this.rowCounterLabels}
                columnNames={this.prepareTableHeaders()}
                items={this.prepareTableContent(trips)}
                labels={{
                    status: TRIP_STATUS_LABELS
                }}
                itemKey="id"
                linkKey={this.props.userId ? 'id' : 'userId'}
                link={this.linkElement()}
            />
        );
    }
}


TripRequestsTable.propTypes = {
    trips: PropTypes.array.isRequired,
    userId: PropTypes.number,
    destinationId: PropTypes.number,
    role: PropTypes.string,
    requestsOnly: PropTypes.bool
};

export default TripRequestsTable;
