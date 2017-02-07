import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { list } from '../../../actions/destinationActions';
import Table from '../../../commons/table';
import { BOOLEAN_LABELS } from '../../../constants';
import Segment from '../../../commons/Segment';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationsList extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true
        };
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.filters = [
            {
                value: true,
                label: 'Active',
                color: 'green',
                group: 'Filter by status',
                field: 'isActive'
            },
            {
                value: false,
                label: 'Inactive',
                color: 'red',
                group: 'Filter by status',
                field: 'isActive'
            }
        ];
    }

    componentDidMount() {
        this.handlers()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    prepareTableContent(items) {
        return items.map(value => ({
            id: value.id,
            name: value.name,
            minimumTripDurationInDays: value.minimumTripDurationInDays,
            countOfActiveVolunteers: value.countOfActiveVolunteers,
            isActive: value.isActive,
            startDate: value.startDate ?
                moment(value.startDate).format('YYYY-MM-DD') : 'Not set',
            endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : 'Forever'
        }));
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <Table
                    search
                    loading={this.state.loading}
                    filters={this.filters}
                    location={this.props.location}
                    emptyState={{
                        title: 'No destinations',
                        message: 'Could not find any destinations.'
                    }}
                    dateFields={this.dateFields}
                    columnNames={{
                        name: 'Name',
                        countOfActiveVolunteers: '# Volunteers',
                        isActive: 'Status',
                        startDate: 'Active from',
                        endDate: 'Active to',
                        minimumTripDurationInDays: 'Minimum trip duration'
                    }}
                    itemKey="id"
                    link={{
                        columnName: 'name',
                        prefix: '/admin/destinations/'
                    }}
                    responsivePriority={[
                        'name',
                        'countOfActiveVolunteers',
                        'isActive',
                        'minimumTripDurationInDays',
                        'endDate',
                        'startDate'
                    ]}
                    labels={{
                        isActive: BOOLEAN_LABELS
                    }}
                    items={this.prepareTableContent(this.props.destinations)}
                />
            </Segment>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationsList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationsList);
