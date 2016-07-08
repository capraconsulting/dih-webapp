import React, { PropTypes } from 'react';

/*
* commons.Button
*
* id - string: id of the button.
*
* type - string: type of the button.
*
* color - string: color class from semantic of the button.
*
* fluid - boolean: if the button is fluid, aka taking full with of the container.
*
* loading - boolean: if the button is loading.
*
* disabled - boolean: if the button is disabled.
*
* children - string: Name to be on the button
*
*/

const createClasses = (props) => {
    const classes = ['ui', 'button'];
    if (props.fluid) classes.push('fluid');
    if (props.loading) classes.push('loading');
    if (props.color) classes.push(props.color);
    return classes;
};

const Button = (props) => (
    <button
        type={props.type}
        className={createClasses(props).join(' ')}
        id={props.id}
        disabled={props.disabled}
    >
        {props.children}
    </button>
);

Button.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    fluid: PropTypes.bool,
    type: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string
};

export default Button;
