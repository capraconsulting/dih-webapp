import React from 'react';

function Dropdown(props) {
    return (
        <div>
            <label htmlFor="selectedDestination">{props.name}</label>
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
