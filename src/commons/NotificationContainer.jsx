import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushNotification } from '../actions/notificationActions';

class NotificationContainer extends Component {
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        const { message, level } = newProps.notification;
        this.notificationSystem.addNotification({
            message,
            level
        });
    }

    render() {
        return (
            <NotificationSystem ref="notificationSystem" />
        );
    }
}

const mapStateToProps = store => ({
    notification: store.notificationState.notification
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ pushNotification }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationContainer);
