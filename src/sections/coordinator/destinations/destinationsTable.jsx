import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { list } from '../../../actions/destinationActions';
import Table from '../../../commons/table';
import Segment from '../../../commons/Segment';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationsTable extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true
        }
        this.filterValues = [
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
    }

    componentDidMount() {
        this.handlers()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    prepareTableContent(items) {
        return items.filter(item => item.users &&
            item.users.map(user => user.id).includes(this.props.account.id))
        .map(value => ({
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
        return (
            <Segment blue loading={this.state.loading}>
                <Table
                    search
                    filters={this.filterValues}
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
            </Segment>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations,
    account: store.accountState.account
});

DestinationsTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DestinationsTable);
