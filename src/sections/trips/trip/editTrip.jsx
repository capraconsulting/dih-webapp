import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import { TRAVEL_METHODS } from '../../../constants';
import Form from '../../../commons/Form';
import SelectField from '../../../commons/Form/SelectField';
import InputField from '../../../commons/Form/InputField';
import TextField from '../../../commons/Form/TextField';
import DateField from '../../../commons/Form/DateField';
import Button from '../../../commons/Button';

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
        errorMessage,
        isFetching
    } = props;
    let travelInformationFields = ''; // Fields for volunteers travel info

    const updateTravelInformationFields = () => {
        if (travelMethod.value === TRAVEL_METHODS.PLANE) {
            travelInformationFields = (
                <div>
                    <InputField
                        label="Aiport of flight departure"
                        type="text"
                        id="departureAirport"
                    >
                        {departureAirport}
                    </InputField>
                    <InputField
                        label="Flight number"
                        type="text"
                        id="flightNumber"
                    >
                        {flightNumber}
                    </InputField>
                </div>
            );
        } else if (travelMethod.value === TRAVEL_METHODS.OTHER) {
            travelInformationFields = (
                <TextField
                    label="Other travel information"
                    id="otherTravelInformation"
                    placeholder="Describe how you're going to travel to the destination"
                >
                    {otherTravelInformation}
                </TextField>
            );
        } else { travelInformationFields = ''; }
        return travelInformationFields;
    };

    updateTravelInformationFields(); // Set area on initial load
    return (
        <div>
            <Form
                id="editTripForm"
                handleSubmit={handleSubmit}
                errorMessage={errorMessage}
            >
                <DateField
                    label="Start date. This can only be changed by an admin.
                    Contact us if you have problems!"
                    minDate={moment()}
                    id="startDate"
                    allowNullValue
                    disabled
                >
                    {startDate}
                </DateField>

                <DateField
                    label="End date (optional)"
                    minDate={startDate.value ? moment(startDate.value) : moment()}
                    id="endDate"
                    allowNullValue
                >
                    {endDate}
                </DateField>

                <DateField
                    label="Date of departure towards the destination"
                    minDate={moment()}
                    allowNullValue
                    id="departureDate"
                >
                    {departureDate}
                </DateField>
                <DateField
                    label="Date of arrival at destination"
                    minDate={moment()}
                    allowNullValue
                    id="arrivalDate"
                >
                    {arrivalDate}
                </DateField>

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

                <InputField
                    label="Hotel you're going to stay at"
                    type="text"
                    id="hotel"
                >
                    {hotel}
                </InputField>

                <TextField
                    label="Notes"
                    id="notes"
                >
                    {notes || ''}
                </TextField>

                <Button
                    type="submit"
                    color="green"
                    right
                    loading={isFetching}
                    id="submit"
                >
                    Save
                </Button>
            </Form>
        </div>
    );
}

EditTrip.propTypes = {
    trip: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};

export default reduxForm({
    form: 'editTripForm',
    fields
})(EditTrip);
