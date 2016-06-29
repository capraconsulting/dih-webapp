import React from 'react';
import NotificationSystem from 'react-notification-system';

import '../styles/main.scss';

import Header from '../commons/Header.jsx';
import Sidebar from '../commons/Sidebar.jsx';

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.notificationSystem = null;
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
    }

    addNotification(event, message, level) {
        event.preventDefault();
        this.notificationSystem.addNotification({ message, level });
    }


    render() {
        return (
            <div>
                <Header />
                <div className="wrapper">
                    <Sidebar />
                    <div className="main-content">
                        <button onClick={(e) => this.addNotification(e, 'Dette er en melding!', 'success')}>Add notification</button>
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
