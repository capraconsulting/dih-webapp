import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Segment from '../../../commons/Segment';
import Table from '../../../commons/table';
import { list } from '../../../actions/adminValuesActions';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        }
    }
);

class AdminValuesTable extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.handlers.list()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <Segment blue loading={this.state.loading}>
                <Table
                    search
                    loading={this.state.loading}
                    emptyState={{
                        title: 'No admin values',
                        message: 'Could not find any admin values.'
                    }}
                    columnNames={{
                        title: 'Title',
                        description: 'Description',
                        value: 'Value'
                    }}
                    link={{
                        columnName: 'title',
                        prefix: '/admin/values/'
                    }}
                    itemKey="id"
                    items={this.props.adminValues}
                />
            </Segment>
        );
    }
}

const mapStateToProps = store => ({
    adminValues: store.adminValuesState.values
});

AdminValuesTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
    adminValues: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AdminValuesTable);
