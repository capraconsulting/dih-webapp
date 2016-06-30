import React from 'react';

function Root(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}

Root.propTypes = {
    children: React.PropTypes.object
};

export default Root;
