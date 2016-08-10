import React, { PropTypes } from 'react';
import DevTools from '../commons/DevTools';


function Root(props) {
    return (
        <div>
            {props.children}
            {__DEV__ && <DevTools />}
        </div>
    );
}

Root.propTypes = {
    children: PropTypes.object
};

export default Root;
