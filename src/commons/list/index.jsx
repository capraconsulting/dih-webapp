import React, { PropTypes } from 'react';
import './list.scss';

const list = (props) => (
    <div className="ui very relaxed divided list">
        {props.children}
    </div>
);

list.propTypes = {
    children: PropTypes.node
};


export default list;
