import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import Table from '../../../commons/table';
import Header from '../../../commons/pageHeader';
import { list } from '../../../actions/userActions';
import { addRecipients } from '../../../actions/messageActions';
import { USER_ROLES, ROLE_LABELS, USER_MEDICAL_DEGREES } from '../../../constants';

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
        this.rowCounterLabels = { prefix: 'Showing', suffix: 'users' };
        this.actions = [
            {
                name: 'Send message',
                icon: 'send',
                action: this.sendMessage = this.sendMessage.bind(this)
            }
        ];
        this.state = {
            loading: true
        };
        this.filterValues = [
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
            },
            {
                value: USER_MEDICAL_DEGREES.DOCTOR,
                label: 'Doctor',
                color: 'blue',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.PARAMEDIC,
                label: USER_MEDICAL_DEGREES.PARAMEDIC,
                color: 'yellow',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.NURSE,
                label: USER_MEDICAL_DEGREES.NURSE,
                color: 'red',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.MIDWIFE,
                label: USER_MEDICAL_DEGREES.MIDWIFE,
                color: 'green',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.PSYCHOLOGIST,
                label: USER_MEDICAL_DEGREES.PSYCHOLOGIST,
                color: 'grey',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.PHYSICAL_THERAPIST,
                label: USER_MEDICAL_DEGREES.PHYSICAL_THERAPIST,
                color: 'purple',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            },
            {
                value: USER_MEDICAL_DEGREES.OTHER,
                label: USER_MEDICAL_DEGREES.OTHER,
                color: 'black',
                group: 'Filter by user degree',
                field: 'medicalDegree'
            }
        ];
    }

    componentDidMount() {
        this.handlers.list()
            .then(() => {
                this.setState({ loading: false });
            });
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
            <Segments>
                <Segment>
                    <Header
                        content="Users"
                        subContent="List of all users"
                        icon="users"
                    />
                </Segment>
                <Segment blue loading={this.state.loading}>
                    <Table
                        search
                        select
                        loading={this.state.loading}
                        location={this.props.location}
                        emptyState={{
                            title: 'No users',
                            message: 'Could not find any users.'
                        }}
                        selected={this.selected}
                        actions={this.actions}
                        filters={this.filterValues}
                        dateFields={this.dateFields}
                        rowCounter={this.rowCounterLabels}
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
    users: PropTypes.array.isRequired,
    location: PropTypes.object
};

export default connect(mapStateToProps)(UsersTableContainer);
