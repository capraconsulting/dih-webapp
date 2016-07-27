import React, { PropTypes } from 'react';
import moment from 'moment';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/*
* commons.Form/DateField
* DateField To be used within a Form components
*
* children - object: A redux form object.
*
* label - string: the label of input field.
*
* placeholder - string: the placeholder of input field.
*
* disabled - boolean: if the button is disabled.
*
* minDate - moment: minimum date possible to select.
*
* maxDate - moment: maximum date possible to select.
*/

const createClasses = (props) => {
    const classes = ['field'];
    if (props.children.touched && props.children.error) classes.push('error');
    return classes;
};

const DateField = (props) => (
    <div className={createClasses(props).join(' ')}>
        <label>{props.label}</label>
        <DataPicker
            {...props.children}
            className="form-control"
            dateFormat="YYYY-MM-DD"
            placeholder={props.placeholder}
            minDate={props.minDate}
            maxDate={props.maxDate}
            disabled={props.disabled}
            selected={props.children.value ? moment(props.children.value, 'YYYY-MM-DD') : null}
            locale="en-gb"
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);

DateField.propTypes = {
    children: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    disabled: PropTypes.bool
};

export default DateField;
