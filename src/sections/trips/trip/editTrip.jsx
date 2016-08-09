import React from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import { TRAVEL_METHODS } from '../../../constants';
import Form from '../../../commons/Form';
import Segment from '../../../commons/Segment';
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
    'arrivalDate'
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
            arrivalDate
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
        <Segment>
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
                    minDate={moment(startDate.value) || moment()}
                    maxDate={props.destination.endDate ?
                            moment(props.destination.endDate) : null}
                    allowNullValue
                    id="endDate"
                >
                    {endDate}
                </DateField>
                <DateField
                    label="Date of arrival at destination"
                    minDate={moment(startDate.value) || moment()}
                    maxDate={props.destination.endDate ?
                            moment(props.destination.endDate) : null}
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
                    fluid
                    loading={isFetching}
                    id="submit"
                >
                    Save
                </Button>
            </Form>
        </Segment>
    );
}

EditTrip.propTypes = {
    trip: React.PropTypes.object.isRequired,
    destination: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};

export default reduxForm({
    form: 'editTripForm',
    fields
})(EditTrip);
