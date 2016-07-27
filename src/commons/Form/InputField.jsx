import React, { PropTypes } from 'react';

/*
* commons.Form/InputField
* InputField To be used within a Form components
*
* children - object: A redux form object.
*
* type - string: the type of input field.
*
* label - string: the label of input field.
*
* placeholder - string: the placeholder of input field.
*
* disabled - boolean: if the button is disabled.
*
* initialValue - string: the inital value.
*
*/

const createClasses = (props) => {
    const classes = ['field'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const InputField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label htmlFor={props.type}>{props.label}</label>
        <input
            {...props.children}
            disabled={props.disabled}
            placeholder={props.placeholder}
            type={props.type}
            id={props.type}
            value={props.children.value || props.initialValue}
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);


InputField.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

export default InputField;
