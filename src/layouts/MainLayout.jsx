import React from 'react';

import '../styles/main.scss';

import Header from '../commons/Header.jsx';
import Sidebar from '../commons/Sidebar.jsx';
import NotificationContainer from '../commons/NotificationContainer.jsx';

class MainLayout extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="wrapper">
                    <Sidebar />
                    <div className="main-content">
                        {this.props.children}
                    </div>
                </div>
                <NotificationContainer props />
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
