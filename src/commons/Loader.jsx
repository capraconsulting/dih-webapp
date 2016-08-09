import React, { PropTypes } from 'react';

const Loader = (props) => (
    <div className={props.active ? 'ui inverted dimmer active' : 'ui inverted dimmer'}>
        <div className="ui large text loader">Loading</div>
    </div>);


Loader.propTypes = {
    active: PropTypes.bool
};

export default Loader;
