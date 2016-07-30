import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { TRAVEL_METHODS } from '../../../constants';
import SelectField from '../../../commons/Form/SelectField';


const fields = [
    'startDate',
    'endDate',
    'hotel',
    'notes',
    'travelMethod',
    'otherTravelInformation',
    'departureAirport',
    'flightNumber',
    'arrivalDate',
    'departureDate'
];

function EditTrip(props) {
    const {
        fields: {
            startDate,
            endDate,
            hotel,
            notes,
            travelMethod,
            otherTravelInformation,
            departureAirport,
            flightNumber,
            arrivalDate,
            departureDate
        },
        handleSubmit,
        submitting
    } = props;
    let travelInformationFields = ''; // Fields for volunteers travel info

    const updateTravelInformationFields = () => {
        if (travelMethod.value === TRAVEL_METHODS.PLANE) {
            travelInformationFields = (<div>
                <div className="field">
                    <label htmlFor="departureAirport">Aiport of flight departure</label>
                    <input
                        type="text"
                        id="departureAirport"
                        {...departureAirport}
                    />
                </div>
                <div className="field">
                    <label htmlFor="flightNumber">Flight number</label>
                    <input
                        type="text"
                        id="flightNumber"
                        {...flightNumber}
                    />
                </div>
            </div>);
        } else if (travelMethod.value === TRAVEL_METHODS.OTHER) {
            travelInformationFields = (
                <div className="field">
                    <label htmlFor="otherTravelInformation">
                        Other travel information
                    </label>
                    <textarea
                        id="otherTravelInformation"
                        placeholder="Describe how you're going to travel to the destination"
                        {...otherTravelInformation}
                    />
                </div>
            );
        } else { travelInformationFields = ''; }
        return travelInformationFields;
    };

    updateTravelInformationFields(); // Set area on intial load
    return (
        <form id="tripForm" className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="startDate">Start date</label>
                <DatePicker
                    {...startDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={moment()}
                    selected={startDate.value ?
                        moment(startDate.value) : ''}
                    id="startDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="endDate">End date</label>
                <DatePicker
                    {...endDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={startDate.value ? moment(startDate.value) : moment()}
                    selected={endDate.value ?
                        moment(endDate.value) : ''}
                    id="endDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="departureDate">Date of departure towards the destination</label>
                <DatePicker
                    {...departureDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={departureDate.value ? moment(departureDate.value) : moment()}
                    selected={departureDate.value ?
                        moment(departureDate.value) : ''}
                    allowNullValue
                    id="departureDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="arrivalDate">Date of arrival at destination</label>
                <DatePicker
                    {...arrivalDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={moment()}
                    selected={arrivalDate.value ?
                        moment(arrivalDate.value) : ''}
                    allowNullValue
                    id="arrivalDate"
                    locale="en-gb"
                />
            </div>

            <SelectField
                label="Method of travel"
                values={[
                    { name: TRAVEL_METHODS.PLANE },
                    { name: TRAVEL_METHODS.OTHER }
                ]}
                placeholder="Select method of travel"
                allowNullValue
                valueLabel="name"
                valueKey="name"
                onInput={() => {
                    updateTravelInformationFields();
                }}
            >
            {travelMethod}
            </SelectField>

            {travelInformationFields}

            <div className="field">
                <label htmlFor="hotel">Hotel you're going to stay at</label>
                <input
                    type="text"
                    id="hotel"
                    {...hotel}
                />
            </div>

            <div className="field">
                <label htmlFor="notes">Notes</label>
                <textarea
                    {...notes}
                    value={notes.value || ''}
                    id="notes"
                />
            </div>

            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Update trip
            </button>
        </form>
    );
}

EditTrip.propTypes = {
    trip: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'UpdateTripForm',
    fields
})(EditTrip);
