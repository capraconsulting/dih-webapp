import React, { PropTypes } from 'react';
import './pageHeader.scss';


const pageHeader = (props) => (
    <h2 className="ui header">
        <i className={`${props.icon} icon`}></i>
        <div className="content">
            {props.content}
            <div className="sub header">{props.subContent}</div>
        </div>
    </h2>
);

pageHeader.propTypes = {
    icon: PropTypes.string,
    content: PropTypes.string,
    subContent: PropTypes.string
};

export default pageHeader;
