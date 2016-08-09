import React, { PropTypes } from 'react';

const createClasses = (props) => {
    const classes = ['item'];
    if (props.disabled) classes.push('disabled');
    return classes;
};

const DropdownItem = (props) => (
    <div onClick={e => props.handleClick(e)} className={createClasses(props).join(' ')}>
        {props.icon && <i className={`${props.icon} icon`}></i>}
        {props.name}
    </div>
);

DropdownItem.propTypes = {
    icon: PropTypes.string,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
    name: PropTypes.string
};

export default DropdownItem;
