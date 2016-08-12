import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Segments from '../../commons/Segments';
import Segment from '../../commons/Segment';
import Header from '../../commons/pageHeader';
import Table from '../../commons/table';
import { TRIP_STATUSES, TRIP_STATUS_LABELS } from '../../constants';
import { trips } from '../../actions/accountActions';

const createHandlers = (dispatch) => () => dispatch(trips());

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.state = {
            loading: true
        };
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

    componentDidMount() {
        this.handlers()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    normalizeTripObjectsForTable(items) {
        return items.filter(value => (value.status !== TRIP_STATUSES.CLOSED))
            .map(value => (
                {
                    id: value.id,
                    status: value.status,
                    destinationName: value.destination.name || 'No destination preferance',
                    startDate: moment(value.startDate).format('YYYY-MM-DD'),
                    endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : 'Not set'
                }
            ));
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        content="Trips"
                        subContent="View and edit your trips"
                        icon="plane"
                    />
                </Segment>
                <Segment blue loading={this.state.loading}>
                    <Table
                        columnNames={{
                            destinationName: 'Destination',
                            startDate: 'Start date',
                            endDate: 'End date',
                            status: 'Status'
                        }}
                        itemKey="id"
                        loading={this.state.loading}
                        emptyState={{
                            title: 'No trips',
                            message: 'You need to signup for a trip.'
                        }}
                        link={{
                            columnName: 'destinationName',
                            prefix: '/trips/'
                        }}
                        labels={{
                            status: TRIP_STATUS_LABELS
                        }}
                        responsivePriority={[
                            'destinationName',
                            'status',
                            'startDate',
                            'endDate'
                        ]}
                        items={this.normalizeTripObjectsForTable(this.props.trips)}
                        search
                        filters={this.filters}
                        dateFields={this.dateFields}
                    />
                </Segment>
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    trips: store.accountState.trips
});

Trips.propTypes = {
    trips: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trips);
