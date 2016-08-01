import React, { PropTypes } from 'react';

/*
* Form.ToggleField
*
* id - string: id of the button.
*
* label - string: Label for toggle
*
* children - object: A redux form object.
*
*/

const ToggleField = props => (
    <div className="ui toggle checkbox">
        <input
            {...props.children}
            type="checkbox"
            id={props.id}
        />
        <label>{props.label}</label>
    </div>
);


ToggleField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string,
    id: PropTypes.string.isRequired
};

export default ToggleField;
