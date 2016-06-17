import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import Header from './commons/Header.jsx';
import Sidebar from './commons/Sidebar.jsx';

import MyProfile from './sections/my-profile/MyProfile.jsx';

function Main() {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <Sidebar />
                <div className="main-content">
                    <MyProfile />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
  React.createElement(Main, null),
  document.getElementById('app')
);
