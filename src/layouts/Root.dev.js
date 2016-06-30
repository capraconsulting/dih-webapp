import React from 'react';

import DevTools from '../commons/DevTools';

function Root(props) {
    return (
        <div>
            {props.children}
            <DevTools />
        </div>
    );
}

Root.propTypes = {
    children: React.PropTypes.object
};

export default Root;
