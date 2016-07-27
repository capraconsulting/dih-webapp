import React, { PropTypes } from 'react';

/*
* commons.Form/SelectField
* SelectField To be used within a Form components
*
* children - object: A redux form object.
*
* type - string: the type of input field.
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
*/

const createClasses = (props) => {
    const classes = ['ui', 'fluid', 'selection', 'dropdown'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const SelectField = (props) => (
    <div className="field">
        <label>{props.label}</label>
        <select
            {...props.children}
            value={props.children.value}
            disabled={props.disabled}
            className={createClasses(props).join(' ')}
        >
            <option value="" disabled={!props.allowNullValue}>
                {props.placeholder}
            </option>
            {props.values.map(value => (
                <option value={value[props.valueKey]} key={value[props.valueKey]} >
                    {value[props.valueLabel]}
                </option>
            ))}
        </select>
    </div>
);


SelectField.propTypes = {
    children: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired,
    valueKey: PropTypes.string.isRequired,
    valueLabel: PropTypes.string.isRequired,
    allowNullValue: PropTypes.bool,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string
};

export default SelectField;
