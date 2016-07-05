import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';
import moment from 'moment';

const fields = ['destinationId', 'wishStartDate', 'wishEndDate'];


function SignupTripForm(props) {
    const {
        fields: { destinationId, wishStartDate, wishEndDate },
        handleSubmit,
        submitting
    } = props;
    return (
        <form id="signupTripForm" className="ui form" onSubmit={handleSubmit}>
            <label htmlFor="destinationId">Destination</label>
            <select
                {...destinationId}
                value={destinationId.value || ''}
                className="ui fluid selection dropdown"
                id="destinationId"
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
                minDate={moment()}
                value={wishStartDate.value ? moment(wishStartDate.value) : null}
                selected={wishStartDate.value ? moment(wishStartDate.value) : null}
                id="wishStartDate"
                locale="en-gb"
            />

            <label htmlFor="wishEndDate">End date</label>
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
            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Add
            </button>
        </form>
    );
}


SignupTripForm.propTypes = {
    destinations: React.PropTypes.array.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'SignupTripForm',
    fields
})(SignupTripForm);
