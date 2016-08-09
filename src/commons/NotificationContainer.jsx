import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushNotification } from '../actions/notificationActions';

const style = {
    NotificationItem: {
        DefaultStyle: {
            fontSize: '18px',
            padding: '20px 30px'
        }
    }
};

class NotificationContainer extends Component {
    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        const { message, level } = newProps.notification;
        this.notificationSystem.addNotification({
            message,
            level,
            autoDismiss: 10
        });
    }

    render() {
        return (
            <NotificationSystem ref="notificationSystem" style={style} />
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
