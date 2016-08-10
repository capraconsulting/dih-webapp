import React, { PropTypes } from 'react';

/*
* commons.Form/StaticInputField
* StaticInputField To be used within a Form components
* this does not work with redux form and ply shows the text
*
* value - string: The value to be shown.
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

const InputField = (props) => (
    <div className="field">
        <label htmlFor={props.type}>
            {props.label}
            {props.required && <span className="required"> *</span>}
        </label>
        <input
            disabled={props.disabled}
            type={props.type}
            id={props.type}
            value={props.value}
        />
    </div>
);


InputField.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

export default InputField;
