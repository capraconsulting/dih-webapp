import React from 'react';
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
    children: React.PropTypes.object
};

export default Root;
