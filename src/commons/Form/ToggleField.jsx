import React, { PropTypes } from 'react';

/*
* Form.ToggleField
*
* id - string: id of the button.
*
* name - string: Name for toggle, placed above it.
*
* label - string: Label for toggle, placed to the right of the toggle.
*
* children - object: A redux form object.
*
*/

const ToggleField = props => (
    <div className="field">
        <label htmlFor={props.id}>{props.name}</label>
        <div className="ui toggle checkbox">
            <input
                {...props.children}
                type="checkbox"
                id={props.id}
            />
            <label>{props.label}</label>
        </div>
    </div>
);


ToggleField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired
};

export default ToggleField;