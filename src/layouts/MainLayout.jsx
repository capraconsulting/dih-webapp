import React from 'react';
import 'semantic-ui-css/semantic.css';
import '../styles/main.scss';
import 'normalize.css/normalize.css';


import Header from '../commons/Header.jsx';
import Sidebar from '../commons/Sidebar.jsx';

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
        </div>
    );
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
