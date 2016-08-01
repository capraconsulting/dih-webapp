import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { list } from '../../../actions/destinationActions';
import Table from '../../../commons/table';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationsList extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    normalizeTripObjectsForTable(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            cleanObjects.push({
                id: value.id,
                name: value.name,
                minimumTripDurationInDays: value.minimumTripDurationInDays,
                countOfActiveVolunteers: value.countOfActiveVolunteers,
                isActive: value.isActive ? 'yes' : 'no',
                startDate: value.startDate ?
                    moment(value.startDate).format('YYYY-MM-DD') : 'Not set',
                endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : 'Not set'
            });
        });
        return cleanObjects;
    }

    render() {
        const dateFields = { from: 'startDate', to: 'endDate' };
        const filterValues = [
            {
                value: 'no',
                label: 'Show inactive only',
                color: 'red',
                group: 'Filter by destination status',
                field: 'isActive'
            },
            {
                value: 'yes',
                label: 'Show active only',
                color: 'green',
                group: 'Filter by destination status',
                field: 'isActive'
            }
        ];
        return (
            <Table
                filters={filterValues}
                columnNames={{
                    name: 'Name',
                    countOfActiveVolunteers: 'Volunteers at destination',
                    startDate: 'Active from',
                    endDate: 'Active to',
                    isActive: 'Active?',
                    minimumTripDurationInDays: 'Minimum trip duration (days)'
                }}
                dateFields={dateFields}
                itemKey="id"
                link={{
                    columnName: 'name',
                    prefix: '/admin/destinations/'
                }}
                items={this.normalizeTripObjectsForTable(this.props.destinations)}
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationsList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationsList);
