import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import RouterComponent from './RouterComponent.jsx';

ReactDOM.render(
    React.createElement(RouterComponent, null),
    document.getElementById('app')
);
