import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { list } from '../../../actions/destinationActions';
import Table from '../../../commons/table';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationsTable extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    prepareTableContent(items) {
        return items.map(value => ({
            id: value.id,
            name: value.name,
            countOfActiveVolunteers: value.countOfActiveVolunteers,
            isActive: this.renderActiveLabel(value.isActive)
        }));
    }

    renderActiveLabel(isActive) {
        if (isActive) return <div className="ui green label">Yes</div>;
        return <div className="ui red label">No</div>;
    }

    render() {
        const filterValues = [
            {
                value: 'yes',
                label: 'Active',
                color: 'green',
                group: 'Filter by active/inactive',
                field: 'isActive'
            },
            {
                value: 'no',
                label: 'Inactive',
                color: 'red',
                group: 'Filter by active/inactive',
                field: 'isActive'
            }
        ];
        return (
            <Table
                search
                filters={filterValues}
                columnNames={{
                    name: 'Name',
                    countOfActiveVolunteers: 'Volunteers at destination',
                    isActive: 'Active'
                }}
                itemKey="id"
                link={{
                    columnName: 'name',
                    prefix: '/coordinator/destinations/'
                }}
                items={this.prepareTableContent(this.props.destinations)}
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationsTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationsTable);
