import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from '../../../../commons/Table';

import * as tripsApi from '../../../../api/trips';

class VolunteersAtDestinationContainer extends React.Component {

    noramlizeTripObjectsForTable(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            cleanObjects.push({
                id: value.id,
                status: value.status,
                firstname: value.user.firstname,
                lastname: value.user.lastname,
                email: value.user.email,
                startDate: value.startDate,
                endDate: value.endDate
            });
        });
        return cleanObjects;
    }

    render() {
        tripsApi.getTripsForDestination(this.props.destinationId, this.props.status);
        return (
            <Table
                columnNames={{
                    firstname: 'First name',
                    lastname: 'Last name',
                    email: 'E-mail',
                    startDate: 'Start date',
                    endDate: 'End date',
                    status: 'Status'
                }}
                items={this.noramlizeTripObjectsForTable(this.props.tripsForDestination)}
            />
        );
    }
}

const mapStateToProps = store => ({
    tripsForDestination: store.tripState.tripsForDestination
});

VolunteersAtDestinationContainer.propTypes = {
    tripsForDestination: React.PropTypes.array.isRequired,
    destinationId: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(VolunteersAtDestinationContainer);
