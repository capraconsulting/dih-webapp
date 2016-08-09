import React, { PropTypes } from 'react';

/*
* commons.Form/SelectField
* SelectField To be used within a Form components
*
* disabled - boolean: if the item is disabled
*
* label - string: labekKey to map from the object fields
*
* item - object: the object of the item
*
* selected - object: The object of the selected element
*
*/

const createClasses = (props) => {
    const classes = ['item'];
    if (props.disabled) classes.push('disabled');
    if (props.item === props.selected) classes.push('selected active');
    return classes;
};

const DropdownItem = (props) => (
    <div
        onClick={() => props.handleSelect(props.item)}
        className={createClasses(props).join(' ')}
    >
        {props.icon && <i className={`${props.item.icon || props.icon} icon`}></i>}
        {props.item[props.label]}
    </div>
);

DropdownItem.propTypes = {
    icon: PropTypes.string,
    handleSelect: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    item: PropTypes.object,
    selected: PropTypes.object
};

export default DropdownItem;
