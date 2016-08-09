import React, { PropTypes } from 'react';

const fluidlistItem = (props) => {
    if (props.hidden !== 'undefined' && props.hidden) return null;
    return (
        <div className="item fluid">
            <i className={`icon ${props.icon}`}></i>
            <div className="content">{props.name}</div>
            <div className="item">
                <div className="content">
                    <div className="ui message">
                        {props.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

fluidlistItem.propTypes = {
    content: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
    hidden: PropTypes.bool
};

export default fluidlistItem;
