import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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

    prepareTableContent(items) {
        const cleanObjects = items;
        return cleanObjects.map(value => {
            const user = value;
            user.birth = value.birth ? moment(value.birth).format('YYYY-MM-DD') : 'Not set';
            return user;
        });
    }

    render() {
        const dateFields = { from: 'birth', to: 'birth' };
        const filterValues = [
            {
                value: USER_ROLES.USER,
                label: 'User',
                color: 'green',
                group: 'Filter by user role',
                field: 'role'
            },
            {
                value: USER_ROLES.MODERATOR,
                label: 'Moderator',
                color: 'yellow',
                group: 'Filter by user role',
                field: 'role'
            },
            {
                value: USER_ROLES.ADMIN,
                label: 'Admin',
                color: 'red',
                group: 'Filter by user role',
                field: 'role'
            }
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
                        dateFields={dateFields}
                        columnNames={{
                            firstname: 'First name',
                            lastname: 'Last name',
                            birth: 'Date of birth',
                            email: 'E-mail',
                            role: 'Role'
                        }}
                        link={{
                            columnName: 'firstname',
                            prefix: '/admin/users/'
                        }}
                        itemKey="id"
                        items={this.prepareTableContent(this.props.users)}
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
