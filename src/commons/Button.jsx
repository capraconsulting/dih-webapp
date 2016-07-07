import React, { PropTypes } from 'react';

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
