import React from 'react';
import '../styles/main.scss';

import NotificationSystem from 'react-notification-system';

import Header from '../commons/Header.jsx';
import Sidebar from '../commons/Sidebar.jsx';

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.notificationSystem = null;
    }

    componentDidMount() {

        this.notificationSystem = this.refs.notificationSystem;
        console.log(this.notificationSystem);
    }

    addNotification(event) {
        event.preventDefault();
        this.notificationSystem.addNotification({
            message: 'Notification message',
            level: 'success'
        });
    }


    render() {
        return (
            <div>
                <Header />
                <div className="wrapper">
                    <Sidebar />
                    <div className="main-content">
                        <button onClick={this.addNotification.bind(this)}>Add notification</button>
                        {this.props.children}
                    </div>
                </div>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
