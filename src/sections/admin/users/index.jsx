import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../commons/table';
import { list } from '../../../actions/userActions';

import { USER_ROLES, TRIP_STATUSES } from '../../../constants';

const createHandlers = (dispatch) => () => dispatch(list());

class UsersTableContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        const filterValues = [
            { color: 'green', label: 'User', value: USER_ROLES.USER, group: 'Filter by user role', field: 'role' },
            // { color: 'empty', label: 'Active', value: TRIP_STATUSES.ACTIVE, group: 'Trip status', field: 'status' },
            { color: 'yellow', label: 'Moderator', value: USER_ROLES.MODERATOR, group: 'Filter by user role', field: 'role' },
            // { color: 'black', label: 'Rejected', value: TRIP_STATUSES.REJECTED, group: 'Trip status', field: 'status' },
            { color: 'red', label: 'Admin', value: USER_ROLES.ADMIN, group: 'Filter by user role', field: 'role' },
            // { color: 'purple', label: 'Pending', value: TRIP_STATUSES.PENDING, group: 'Trip status', field: 'status' }
        ];

        return (
            <Table
                search
                filters={filterValues}
                columnNames={{
                    firstname: 'First name',
                    lastname: 'Last name',
                    email: 'E-mail',
                    role: 'Role'
                }}
                link={{
                    columnName: 'firstname',
                    prefix: '/admin/users/'
                }}
                itemKey="id"
                items={this.props.users}
            />
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

UsersTableContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(UsersTableContainer);
