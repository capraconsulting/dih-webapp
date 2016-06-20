import React from 'react';
import ReactDOM from 'react-dom';

import '../public/styles/app.scss';

function HelloWorld() {
    return (
        <div>
            <h1 className="hello-capra">Hei, Capra!</h1>
            <h2 className="hello-capra">Hei, Capra!</h2>
        </div>
    );
}

ReactDOM.render(
  React.createElement(HelloWorld, null),
  document.getElementById('app')
);
