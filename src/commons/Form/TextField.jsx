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
*
*/

const createClasses = (props) => {
    const classes = ['field'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const TextField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label htmlFor={props.type}>{props.label}</label>
        <textarea
            rows={props.rows}
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


TextField.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

export default TextField;
