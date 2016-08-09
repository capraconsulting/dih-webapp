import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import Table from '../../../commons/table';
import { USER_ROLES } from '../../../constants';

class Recipients extends Component {
    constructor(props) {
        super(props);
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

    sendMessage(selected) {
        this.props.addRecipients(selected);
        browserHistory.push('/admin/message/compose');
    }

    render() {
        return (
            <Table
                search
                select
                selected={this.props.recipients}
                actions={this.actions}
                filters={this.filterValues}
                columnNames={{
                    fullName: 'Name',
                    email: 'E-mail',
                    role: 'Role'
                }}
                link={{
                    columnName: 'fullName',
                    prefix: '/admin/users/'
                }}
                itemKey="id"
                items={this.props.users}
            />
        );
    }
}

Recipients.propTypes = {
    users: PropTypes.array,
    recipients: PropTypes.array,
    addRecipients: PropTypes.func
};

export default Recipients;
