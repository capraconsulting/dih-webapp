import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { list } from '../../../actions/destinationActions';
import Header from '../../../commons/pageHeader';
import Table from '../../../commons/table';

const createHandlers = (dispatch) => () => dispatch(list());

class Destinations extends Component {
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
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        content="Destinations"
                        subContent="List of all destinations"
                        icon="marker"
                    />
                </div>
                <div className="ui blue segment">
                    <Table
                        filters={filterValues}
                        columnNames={{
                            name: 'Name',
                            startDate: 'Date destination becomes active',
                            endDate: 'Date destination becomes inactive',
                            isActive: 'Destination active?',
                            minimumTripDurationInDays: 'Minimum trip duration (days)',
                            countOfActiveVolunteers: 'Number of active volunteers at destination'
                        }}
                        dateFields={dateFields}
                        itemKey="id"
                        link={{
                            columnName: 'name',
                            prefix: '/admin/destinations/'
                        }}
                        items={this.normalizeTripObjectsForTable(this.props.destinations)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

Destinations.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Destinations);
