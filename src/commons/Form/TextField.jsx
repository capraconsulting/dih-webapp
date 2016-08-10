import React, { PropTypes } from 'react';

/*
* commons.Form/TextField
* TextField To be used within a Form components
*
* children - object: A redux form object.
*
* rows - integer: number of rows in textarea.
*
* type - string: the type of input field.
*
* label - string: the label of input field.
*
* placeholder - string: the placeholder of input field.
*
* disabled - boolean: if the button is disabled.
*/

const createClasses = (props) => {
    const classes = ['field'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const TextField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label htmlFor={props.label}>
            {props.label}
            {props.required && <span className="required"> *</span>}
        </label>
        <textarea
            {...props.children}
            rows={props.rows}
            disabled={props.disabled}
            placeholder={props.placeholder}
            id={props.label}
            value={props.children.value || ''}
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);


TextField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

export default TextField;
