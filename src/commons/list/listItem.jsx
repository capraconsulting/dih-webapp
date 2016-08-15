import React, { PropTypes } from 'react';

const listItem = (props) => {
    if (props.hidden !== 'undefined' && props.hidden) return null;
    return (
        <div className="item">
            <div className="right floated content">{props.content ? props.content : 'Not set'}</div>
            <i className={`icon ${props.icon}`}></i>
            <div className="content">{props.name}</div>
        </div>
    );
};

listItem.propTypes = {
    content: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    hidden: PropTypes.bool
};


export default listItem;
