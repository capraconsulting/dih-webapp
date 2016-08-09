import React, { PropTypes } from 'react';
import Editor from '../Editor';

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

const HtmlField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label htmlFor={props.label}>{props.label}</label>
        <Editor
            onChange={html => props.children.onChange(html)}
            html={props.children.value}
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);

HtmlField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
};

export default HtmlField;
