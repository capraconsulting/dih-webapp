import React, { PropTypes } from 'react';

const createClasses = (props) => {
    const classes = ['field'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const InputField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label htmlFor={props.type}>{props.label}</label>
        <input
            disabled={props.disabled}
            placeholder={props.placeholder}
            type={props.type}
            id={props.type}
            {...props.children}
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);


InputField.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

export default InputField;
