import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../commons/table';
import Header from '../../../commons/pageHeader';

import { list } from '../../../actions/userActions';

import { USER_ROLES } from '../../../constants';

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
            { color: 'green', label: 'User', value: USER_ROLES.USER, group: 'Filter by user role', field: 'role' }, // eslint-disable-line
            { color: 'yellow', label: 'Moderator', value: USER_ROLES.MODERATOR, group: 'Filter by user role', field: 'role' }, // eslint-disable-line
            { color: 'red', label: 'Admin', value: USER_ROLES.ADMIN, group: 'Filter by user role', field: 'role' } // eslint-disable-line
        ];

        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        content="Users"
                        subContent="List of all users"
                        icon="users"
                    />
                </div>
                <div className="ui blue segment">
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
                </div>
            </div>
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
