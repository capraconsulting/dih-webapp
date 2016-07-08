import React from 'react';

/*
* commons.Dropdown
* @param {props} With properties options, name, onChange, selectedValue
* options is an array of objects with properties key and value, which are listed
* in the Dropdown
* name is the name of the dropdown which will be shown in a label for it
* onChange is the method that handles dropdown change
* selectedValue is the value that is initially selected
*/
function Dropdown(props) {
    return (
        <div>
            <label htmlFor="dropdown">{props.name}</label>
            <select
                value={props.selectedValue || ''}
                className="ui fluid selection dropdown"
                onChange={props.onChange}
            >
                {props.options.map(option => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
Dropdown.propTypes = {
    options: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    selectedValue: React.PropTypes.string.isRequired
};
export default Dropdown;
