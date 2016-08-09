import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Table from '../../../commons/table';
import Header from '../../../commons/pageHeader';
import { list } from '../../../actions/userActions';
import { addRecipients } from '../../../actions/messageActions';
import { USER_ROLES, ROLE_LABELS } from '../../../constants';

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
        this.handlers.list();
    }

    prepareTableContent(items) {
        return items.map(value => {
            const user = value;
            user.birth = value.birth ? moment(value.birth).format('YYYY-MM-DD') : 'Not set';
            return user;
        });
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
                        dateFields={this.dateFields}
                        labels={{
                            role: ROLE_LABELS
                        }}
                        columnNames={{
                            fullName: 'Name',
                            phoneNumber: 'Phone Number',
                            birth: 'Date of birth',
                            email: 'E-mail',
                            role: 'Role'
                        }}
                        link={{
                            columnName: 'fullName',
                            prefix: '/admin/users/'
                        }}
                        responsivePriority={[
                            'fullName',
                            'email',
                            'role',
                            'phoneNumber',
                            'birth'
                        ]}
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
