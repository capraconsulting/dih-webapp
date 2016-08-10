import React, { PropTypes } from 'react';

/*
* Form.ToggleField
*
* id - string: id of the button.
*
* name - string: Name for toggle, placed above it.
*
* label - string: Label for toggle, placed to the right of the toggle. It allows HTML.
*
* children - object: A redux form object.
*
*/

const ToggleField = props => (
    <div className="field">
        <label htmlFor={props.id}>
            {props.name}
            {props.required && <span className="required"> *</span>}
        </label>
        <div className="ui toggle checkbox">
            <input
                {...props.children}
                type="checkbox"
                id={props.id}
            />
            <label dangerouslySetInnerHTML={{ __html: props.label }} />
        </div>
    </div>
);


ToggleField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    required: PropTypes.bool
};

export default ToggleField;
