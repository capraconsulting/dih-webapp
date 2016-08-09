import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import Table from '../../../commons/table';
import Header from '../../../commons/pageHeader';
import { list } from '../../../actions/userActions';
import { USER_ROLES } from '../../../constants';

const createHandlers = (dispatch) => () => dispatch(list());

class UsersTableContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.dateFields = { from: 'birth', to: 'birth' };
        this.filterValues = [
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

    }

    componentDidMount() {
        this.handlers();
    }

    prepareTableContent(items) {
        return items.map(value => {
            const user = value;
            user.birth = value.birth ? moment(value.birth).format('YYYY-MM-DD') : 'Not set';
            return user;
        });
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        content="Users"
                        subContent="List of all users"
                        icon="users"
                    />
                </Segment>
                <Segment blue loading={this.props.users.length < 1}>
                    <Table
                        search
                        filters={this.filterValues}
                        dateFields={this.dateFields}
                        columnNames={{
                            fullName: 'Name',
                            birth: 'Date of birth',
                            email: 'E-mail',
                            role: 'Role'
                        }}
                        link={{
                            columnName: 'fullName',
                            prefix: '/admin/users/'
                        }}
                        itemKey="id"
                        items={this.prepareTableContent(this.props.users)}
                    />
                </Segment>
            </Segments>
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
