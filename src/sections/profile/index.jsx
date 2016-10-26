import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import { DATE_FORMAT } from '../../constants';
import { update, retrieve } from '../../actions/accountActions';
import { pushNotification } from '../../actions/notificationActions';
import Header from '../../commons/pageHeader';
import Navbar from '../../commons/navbar';
import Segment from '../../commons/Segment';
import Segments from '../../commons/Segments';

const createHandlers = (dispatch) => (
    {
        retrieve() {
            return dispatch(retrieve());
        },
        update(data) {
            return dispatch(update(data));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        },
        delete(data) {
            return dispatch(delete(data));
        }
    }
);
class Profile extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'View',
                    uri: '/profile'
                },
                {
                    name: 'Edit',
                    uri: '/profile/edit'
                },
                {
                    name: 'Delete',
                    uri: '/profile/delete'
                }
            ]
        };
        this.handlers.retrieve();
    }

    componentDidMount() {
        this.handlers.retrieve();
    }

    onUpdate(data) {
        this.handlers.update({
            ...data,
            birth: moment(data.birth).toString()
        })
        .then(() => this.handlers.retrieve())
        .then(() => this.handlers.notification('Profile is updated.', 'success'))
        .then(() => browserHistory.push('/profile'));
    }

    onDelete() {
        this.handlers.delete({})
        .then(() => this.handlers.notification('Profile is deleted.', 'success'))
        .then(() => browserHistory.push('/login'));
    }

    prepareInitialValues(account) {
        return {
            ...account,
            birth: moment(account.birth).format(DATE_FORMAT)
        };
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        icon="child"
                        content="Profile"
                        subContent="View and edit information about yourself"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.prepareInitialValues(this.props.account),
                    user: this.props.account,
                    showAdminFields: false,
                    onSubmit: e => this.onUpdate(e),
                    onDelete: e => this.onDelete(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    account: store.accountState.account
});

Profile.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Profile);
