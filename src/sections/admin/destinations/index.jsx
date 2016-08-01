import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
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

    render() {
        const filterValues = [
            {
                value: false,
                label: 'Show inactive',
                color: 'red',
                group: 'Filter by destination status',
                field: 'isActive'
            },
            {
                value: true,
                label: 'Show active',
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
                            name: 'Name'
                        }}
                        itemKey="id"
                        link={{
                            columnName: 'name',
                            prefix: '/admin/destinations/'
                        }}
                        items={this.props.destinations}
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
