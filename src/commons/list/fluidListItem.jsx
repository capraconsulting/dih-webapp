import React, { PropTypes } from 'react';

const fluidlistItem = (props) => (
    <div className="item fluid">
        <i className={`icon ${props.icon}`}></i>
        <div className="content">{props.name}</div>
        <div className="item">
            <div className="content">{props.content}</div>
        </div>
    </div>
);

fluidlistItem.propTypes = {
    content: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
};

export default fluidlistItem;
