import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Table from '../../../commons/table';
import Header from '../../../commons/pageHeader';

import { list } from '../../../actions/userActions';
import { addRecipients } from '../../../actions/messageActions';

import { USER_ROLES } from '../../../constants';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        },
        addRecipients(users) {
            return dispatch(addRecipients(users));
        }
    }
);

class UsersTableContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.actions = [
            {
                name: 'Send message',
                icon: 'send',
                action: this.sendMessage = this.sendMessage.bind(this)
            }
        ];
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
        this.handlers.list();
    }

    sendMessage(selected) {
        this.handlers.addRecipients(selected);
        browserHistory.push('/admin/message/compose');
    }

    render() {
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
                        select
                        selected={this.selected}
                        actions={this.actions}
                        filters={this.filterValues}
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
