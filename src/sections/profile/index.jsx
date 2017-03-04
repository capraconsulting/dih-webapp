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

class Profile extends Component {
    constructor(props) {
        super(props);
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
    }

    componentDidMount() {
        this.props.retrieve();
    }

    onUpdate(data) {
        if (data.isActive !== 'undefined'
        && data.isActive !== null
        && data.isActive) { // isActive is defined and set to true
            // Because it's inverted before it's handed to views
            // So that the toggle works as we want in DeleteUser
            const deactivatedUser = data;
            deactivatedUser.isActive = false;
            this.props.update(deactivatedUser)
            .then(() => this.props.pushNotification('Profile is deleted', 'success'))
            .then(() => browserHistory.push('/login'));
            return;
        }
        this.props.update({
            ...data,
            birth: moment(data.birth).toString()
        })
        .then(() => this.props.retrieve())
        .then(() => this.props.pushNotification('Profile is updated.', 'success'))
        .then(() => browserHistory.push('/profile'));
    }

    prepareInitialValues(account) {
        return {
            ...account,
            isActive: !account.isActive,
            birth: account.birth ? moment(account.birth, DATE_FORMAT).format(DATE_FORMAT) : ''
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
                    onSubmit: e => this.onUpdate(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    account: store.accountState.account
});

const mapStateToDispatch = {
    retrieve,
    update,
    pushNotification
};

Profile.propTypes = {
    children: PropTypes.object.isRequired,
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    pushNotification: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapStateToDispatch)(Profile);
