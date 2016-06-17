import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import Sidebar from './commons/Sidebar.jsx';

function MyProfile() {
    return (
        <Sidebar />
    );
}

ReactDOM.render(
  React.createElement(MyProfile, null),
  document.getElementById('app')
);
