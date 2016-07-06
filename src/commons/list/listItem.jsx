import React, { PropTypes } from 'react';

const listItem = (props) => (
    <div className="item">
        <div className="right floated content">{props.content}</div>
        <i className={`icon ${props.icon}`}></i>
        <div className="content">{props.name}</div>
    </div>
);

listItem.propTypes = {
    content: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
};


export default listItem;
