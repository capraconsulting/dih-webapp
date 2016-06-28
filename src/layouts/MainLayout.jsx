import React from 'react';
import '../styles/main.scss';

import Header from '../commons/Header.jsx';
import Sidebar from '../commons/Sidebar.jsx';
import DevTools from '../commons/DevTools';

function MainLayout(props) {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <Sidebar />
                <div className="main-content">
                    {props.children}
                </div>
            </div>
            <DevTools />
        </div>
    );
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
