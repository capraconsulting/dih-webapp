import React from 'react';
import ReactDOM from 'react-dom';


require('../assets/css/app.scss');

function HelloWorld() {
    return (
        <h1>Hei, Capra!</h1>
    );
}

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('app')
);
