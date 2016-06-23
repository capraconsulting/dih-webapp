import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';
import moment from 'moment';

const fields = ['selectedDestination', 'fromDate', 'toDate'];


function NewTripForm(props) {
    const {
        fields: { selectedDestination, fromDate, toDate },
        handleSubmit } = props;
    return (
        <form id="newTripForm" onSubmit={handleSubmit}>
            <label htmlFor="tripName">Destination:</label>
            <select {...selectedDestination} className="ui fluid dropdown" >
                <option value="">Destinations</option>
                {props.destinations.map(destination => (
                    <option key={destination.id}>{destination.name}</option>
                ))}
            </select>
            <DatePicker
                {...fromDate}
                dateFormat="YYYY-MM-DD"
                value={fromDate.value ? moment(fromDate.value) : null}
                selected={fromDate.value ? moment(fromDate.value) : null}
                id="fromDate"
                locale="en-gb"
            />

            <DatePicker
                {...toDate}
                dateFormat="YYYY-MM-DD"
                value={toDate.value ? moment(toDate.value) : null}
                selected={toDate.value ? moment(toDate.value) : null}
                id="toDate"
                locale="en-gb"
            />
            <button type="submit">Add</button>
        </form>
    );
}


NewTripForm.propTypes = {
    destinations: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
};

export default reduxForm({
    form: 'NewTripForm',
    fields
})(NewTripForm);
