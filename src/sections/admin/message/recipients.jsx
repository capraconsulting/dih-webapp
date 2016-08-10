import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import Table from '../../../commons/table';
import { USER_ROLES, ROLE_LABELS } from '../../../constants';

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
        this.filters = [
            {
                value: USER_ROLES.USER,
                label: 'User',
                color: 'empty',
                group: 'Filter by user role',
                field: 'role'
            },
            {
                value: USER_ROLES.MODERATOR,
                label: 'Coordinator',
                color: 'grey',
                group: 'Filter by user role',
                field: 'role'
            },
            {
                value: USER_ROLES.ADMIN,
                label: 'Administrator',
                color: 'black',
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
                filters={this.filters}
                columnNames={{
                    fullName: 'Name',
                    email: 'E-mail',
                    role: 'Role'
                }}
                link={{
                    columnName: 'fullName',
                    prefix: '/admin/users/'
                }}
                labels={{
                    role: ROLE_LABELS
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
