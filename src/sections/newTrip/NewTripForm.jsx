import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';
import moment from 'moment';

const fields = ['selectedDestination', 'wishStartDate', 'wishEndDate'];


function NewTripForm(props) {
    const {
        fields: { selectedDestination, wishStartDate, wishEndDate },
        handleSubmit } = props;
    return (
        <form id="newTripForm" className="ui form" onSubmit={handleSubmit}>
            <label htmlFor="selectedDestination">Destination</label>
            <select
                {...selectedDestination}
                value={selectedDestination.value || ''}
                className="ui fluid selection dropdown"
                id="selectedDestination"
            >
                <option value="">Destinations</option>
                {props.destinations.map(destination => (
                    <option
                        value={destination.id}
                        key={destination.id}
                    >
                        {destination.name}
                    </option>
                ))}
            </select>

            <label htmlFor="wishStartDate">Start date</label>
            <DatePicker
                {...wishStartDate}
                dateFormat="YYYY-MM-DD"
                placeholderText="YYYY-MM-DD"
                value={wishStartDate.value ? moment(wishStartDate.value) : null}
                selected={wishStartDate.value ? moment(wishStartDate.value) : null}
                id="wishStartDate"
                locale="en-gb"
            />

            <label htmlFor="wishENdDate">End date</label>
            <DatePicker
                {...wishEndDate}
                dateFormat="YYYY-MM-DD"
                placeholderText="YYYY-MM-DD"
                minDate={wishStartDate.value ? moment(wishStartDate.value) : null}
                value={wishEndDate.value ? moment(wishEndDate.value) : null}
                selected={wishEndDate.value ? moment(wishEndDate.value) : null}
                id="wishEndDate"
                locale="en-gb"
            />
            <button className="ui button primary" type="submit">Add</button>
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
