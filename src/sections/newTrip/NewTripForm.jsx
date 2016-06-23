import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';

const fields = ['selectedDestination', 'toDate', 'fromDate'];


function NewTripForm(props) {
    const {
        fields: { selectedDestination, fromDate, toDate },
        handleSubmit } = props;
        console.log(props);
    return (
        <form id="newTripForm" onSubmit={handleSubmit(props.onSubmit)}>
            <label htmlFor="tripName">Destination:</label>
            <select {...selectedDestination} className="ui fluid dropdown" >
                <option value="">Destinations</option>
                {/*{props.destinations.map(destination => (
                    <option key={destination.id}>{destination.name}</option>
                ))}*/}
                <option>Kos</option>
                <option>Lesvos</option>
            </select>
            {/*<DatePicker
                {...fromDate}
                id="fromDate"
                locale="en-gb"
            />

            <DatePicker
                {...toDate}
                id="toDate"
                locale="en-gb"
            /> */}
            <button type="submit">Add</button>
        </form>
    );
}


NewTripForm.propTypes = {
    //destinations: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired
};

export default reduxForm({
    form: 'NewTripForm',
    fields,
})(NewTripForm);
