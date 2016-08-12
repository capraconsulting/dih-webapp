import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import Form from '../Form';
import Button from '../Button';
import Segment from '../Segment';
import DateField from '../Form/DateField';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import TextField from '../Form/TextField';
import { TRAVEL_METHODS } from '../../constants';

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
    'destinationId'
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
            destinationId,
            flightNumber,
            arrivalDate
        },
        handleSubmit,
        editAdmin,
        errorMessage,
        isFetching
    } = props;

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
                    disabled={!props.editAdmin}
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
                    required
                >
                    {arrivalDate}
                </DateField>

                {editAdmin &&
                    <SelectField
                        label="Destination"
                        values={props.destinations}
                        nullValue="No destination preference"
                        placeholder="Select a destination"
                        icon="marker"
                        valueLabel="name"
                        valueKey="id"
                    >
                        {destinationId}
                    </SelectField>
                }

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
                    required
                >
                    {travelMethod}
                </SelectField>

                {travelMethod.value === TRAVEL_METHODS.PLANE &&
                    <InputField
                        label="Aiport of flight departure"
                        type="text"
                        id="departureAirport"
                        required
                    >
                        {departureAirport}
                    </InputField>
                }
                {travelMethod.value === TRAVEL_METHODS.PLANE &&
                    <InputField
                        label="Flight number"
                        type="text"
                        id="flightNumber"
                        required
                    >
                        {flightNumber}
                    </InputField>
                }
                {travelMethod.value === TRAVEL_METHODS.OTHER &&
                    <TextField
                        label="Other travel information (method of travel, arrival place and time)"
                        id="otherTravelInformation"
                        required
                        rows="4"
                    >
                        {otherTravelInformation}
                    </TextField>
                }

                <InputField
                    label="Where are you going to stay? (Hotel name, camping, private, etc.)"
                    type="text"
                    id="hotel"
                    required
                >
                    {hotel}
                </InputField>

                <TextField
                    label="Additional information"
                    id="notes"
                    rows="3"
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
    trip: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    destinations: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    editAdmin: PropTypes.bool
};

export default reduxForm({
    form: 'editTripForm',
    fields
})(EditTrip);
