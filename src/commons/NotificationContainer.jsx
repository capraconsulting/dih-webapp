import React, { Component, PropTypes } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushNotification } from '../actions/notificationActions';

const colours = {
    success: '97, 184, 50',
    error: '203, 2, 12',
    warning: '251, 140, 27',
    info: '45, 92, 137'
};

const createStyle = (isMobile) => {
    const style = {
        Containers: {
            DefaultStyle: {
                padding: '0px',
                width: 'auto'
            },
            tc: {
                top: '0px',
                bottom: 'auto',
                left: '260px',
                right: '0px'
            }
        },
        NotificationItem: {
            DefaultStyle: {
                borderRadius: '0px',
                fontSize: '18px',
                margin: '0px',
                padding: '22px 50px',
                opacity: '0.95',
                minHeight: '63px'
            },
            success: {
                borderTop: 'none',
                backgroundColor: `rgb(${colours.success})`,
                color: '#ffffff',
                WebkitBoxShadow: `0 0 1px rgba(${colours.success}, 0.9)`,
                MozBoxShadow: `0 0 1px rgba(${colours.success}, 0.9)`,
                boxShadow: `0 0 1px rgba(${colours.success}, 0.9)`
            },
            error: {
                borderTop: 'none',
                backgroundColor: `rgb(${colours.error})`,
                color: '#ffffff',
                WebkitBoxShadow: `0 0 1px rgba(${colours.error}, 0.9)`,
                MozBoxShadow: `0 0 1px rgba(${colours.error}, 0.9)`,
                boxShadow: `0 0 1px rgba(${colours.error}, 0.9)`
            },
            warning: {
                borderTop: 'none',
                backgroundColor: `rgb(${colours.warning})`,
                color: '#ffffff',
                WebkitBoxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`,
                MozBoxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`,
                boxShadow: `0 0 1px rgba(${colours.warning}, 0.9)`
            },
            info: {
                borderTop: 'none',
                backgroundColor: `rgb(${colours.info})`,
                color: '#ffffff',
                WebkitBoxShadow: `0 0 1px rgba(${colours.info}, 0.9)`,
                MozBoxShadow: `0 0 1px rgba(${colours.info}, 0.9)`,
                boxShadow: `0 0 1px rgba(${colours.info}, 0.9)`
            }
        },
        Dismiss: {
            DefaultStyle: {
                top: '24px',
                right: '15px',
                backgroundColor: 'rgba(1,1,1, 0.3)',
                width: '16px',
                height: '16px',
                paddingTop: '1px'
            }
        }
    };

    if (isMobile) {
        style.Containers.tc.left = '0px';
    }

    return style;
};

class NotificationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { isMobile: props.isMobile };
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isMobile === this.state.isMobile) {
            const { message, level } = newProps.notification;

            let notificationIcon = 'info';
            if (level === 'error') notificationIcon = 'remove';
            else if (level === 'success') notificationIcon = 'checkmark';
            else if (level === 'warning') notificationIcon = 'warning';

            this.notificationSystem.addNotification({
                message: `<i class="${notificationIcon} icon"></i> ${message}`,
                level,
                position: 'tc',
                autoDismiss: 7
            });
        } else {
            this.setState({ isMobile: newProps.isMobile });
        }
    }

    render() {
        return (
            <NotificationSystem
                ref="notificationSystem"
                style={createStyle(this.state.isMobile)}
                allowHTML
            />
        );
    }
}

NotificationContainer.propTypes = {
    isMobile: PropTypes.bool.isRequired
};

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
