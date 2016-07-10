import React, { PropTypes } from 'react';
import moment from 'moment';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TODO
// This is component is not done, and has some issue with moment/datestring
//
const DateField = (props) => (
    <div className="field">
        <label htmlFor={props.type}>{props.label}</label>
        <DataPicker
            className="form-control"
            selected={props.children.value ? moment(props.children.value) : null}
            id={props.type}
            locale="en-gb"
            {...props.children}
        />
        {props.children.touched && props.children.error &&
            <div className="inline-error">{props.children.error}</div>}
    </div>
);

DateField.propTypes = {
    children: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default DateField;
