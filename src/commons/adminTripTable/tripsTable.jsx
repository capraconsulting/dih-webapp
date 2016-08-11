import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { USER_ROLES, TRIP_STATUS_LABELS } from '../../constants';
import Table from '../../commons/table';

class TripsTable extends Component {
    constructor(props) {
        super(props);
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.rowCounterLabels = { prefix: 'Showing', suffix: 'trips' };
        this.filters = [
            {
                color: 'empty',
                label: 'Pending',
                value: TRIP_STATUSES.PENDING,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'teal',
                label: 'Accepted',
                value: TRIP_STATUSES.ACCEPTED,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'olive',
                label: 'Active',
                value: TRIP_STATUSES.ACTIVE,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'green',
                label: 'Present',
                value: TRIP_STATUSES.PRESENT,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'grey',
                label: 'Left',
                value: TRIP_STATUSES.LEFT,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'red',
                label: 'Rejected',
                value: TRIP_STATUSES.REJECTED,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'black',
                label: 'Closed',
                value: TRIP_STATUSES.CLOSED,
                group: 'Trip status',
                field: 'status'
            },
            {
                color: 'orange',
                label: 'No show',
                value: TRIP_STATUSES.NOSHOW,
                group: 'Trip status',
                field: 'status'
            }
        ];
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
        if (this.props.statuses) {
            filteredTrips = trips.filter(trip => _.includes(this.props.statuses, trip.status));
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
                filters={this.filters}
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


TripsTable.propTypes = {
    trips: PropTypes.array.isRequired,
    userId: PropTypes.number,
    destinationId: PropTypes.number,
    role: PropTypes.string,
    statuses: PropTypes.array
};

export default TripsTable;
