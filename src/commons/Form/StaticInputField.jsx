import React, { PropTypes } from 'react';

const InputField = (props) => (
    <div className="field">
        <label htmlFor={props.type}>{props.label}</label>
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
    placeholder: PropTypes.string
};

export default InputField;
