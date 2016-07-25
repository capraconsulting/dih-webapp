import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import Table from '../../commons/Table';
import { listForUser } from '../../actions/tripActions';

const createHandlers = (dispatch) => (userId) => dispatch(listForUser(userId));

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(1); // @TODO: Replace hard coded userId with id from account object
    }

    normalizeTripObjectsForTable(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            cleanObjects.push({
                id: value.id,
                status: value.status,
                destinationName: value.destination.name,
                startDate: moment(value.wishStartDate).format('YYYY-MM-DD'),
                endDate: moment(value.wishEndDate).format('YYYY-MM-DD')
            });
        });
        return cleanObjects;
    }

    render() {
        return (
            <div>
                <Table
                    columnNames={{
                        destinationName: 'Destination',
                        startDate: 'Start date',
                        endDate: 'End date',
                        status: 'Status'
                    }}
                    itemKey="id"
                    items={this.normalizeTripObjectsForTable(this.props.tripsForUser)}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    tripsForUser: store.tripState.tripsForUser,
    isFetching: store.authenticationState.isFetching
});

Trips.propTypes = {
    tripsForUser: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Trips);
