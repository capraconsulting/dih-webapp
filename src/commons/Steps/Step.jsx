import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const createClasses = (props) => {
    const classes = ['step'];
    if (props.active) classes.push('active');
    if (props.disabled) classes.push('disabled');
    if (props.validate) classes.push(props.validate);
    return classes;
};

const Step = (props) => (
    <Link className={createClasses(props).join(' ')} activeClassName="active" to={props.uri}>
        <i className={`${props.icon} icon`} ></i>
        <div className="content">
            <div className="title">{props.title}</div>
            <div className="description">{props.description}</div>
        </div>
    </Link>
);

Step.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    validate: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    uri: PropTypes.string
};


export default Step;
