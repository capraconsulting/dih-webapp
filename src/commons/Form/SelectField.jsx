import React, { PropTypes } from 'react';
import Dropdown from '../DropdownComponent';
import DropdownItem from '../DropdownComponent/DropdownItem';
/*
* commons.Form/SelectField
* SelectField To be used within a Form components
*
* children - object: A redux form object.
*
* label - string: the label of input field.
*
* values - array: of possible options.
*
* valueKey - string: the key to be selected as data value from options
*
* valueLabel - string: the field from the values to be used as label.
*
* placeholder - string: the placeholder of input field.
*
* disabled - boolean: if the button is disabled.
*
*/

const addNullValue = (props) => {
    if (!props.allowNullValue) return props.values;
    return [...props.values, { [props.valueKey]: null, [props.valueLabel]: props.nullValue }];
};

const SelectField = (props) => (
    <div className="field">
        <label>
            {props.label}
            {props.required && <span className="required"> *</span>}
        </label>
        <Dropdown
            fluid
            search
            selection
            noInitalValue={props.noInitalValue}
            value={props.children.value}
            disabled={props.disabled}
            placeholder={props.placeholder}
            error={props.children.touched && props.children.error}
            label={props.valueLabel}
            icon={props.icon}
            initialValue={props.children.initialValue}
            valueKey={props.valueKey}
            onSelect={props.children.onChange}
        >
        {addNullValue(props).map(value => (
            <DropdownItem
                item={value}
                key={value[props.valueKey]}
                label={props.valueLabel}
            />
        ))}
        </Dropdown>
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);

SelectField.propTypes = {
    children: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    valueKey: PropTypes.string.isRequired,
    valueLabel: PropTypes.string.isRequired,
    allowNullValue: PropTypes.bool,
    search: PropTypes.bool,
    noInitalValue: PropTypes.bool,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool
};

export default SelectField;
