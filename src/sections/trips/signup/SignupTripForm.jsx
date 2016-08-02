import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import Form from '../../../commons/Form';
import Button from '../../../commons/Button';
import TextField from '../../../commons/Form/TextField';
import DateField from '../../../commons/Form/DateField';
import SelectField from '../../../commons/Form/SelectField';

const fields = ['destinationId', 'notes', 'startDate', 'endDate'];

const validate = values => { // eslint-disable-line
    const errors = {};
    if (!values.startDate) errors.startDate = 'Required';
    return errors;
};

function SignupTripForm(props) {
    const {
        fields: { destinationId, notes, startDate, endDate },
        handleSubmit,
        errorMessage,
        successMessage,
        isFetching
    } = props;

    return (
        <Form
            id="signUpTripForm"
            errorMessage={errorMessage}
            successMessage={successMessage}
            handleSubmit={handleSubmit}
        >
            <SelectField
                label="Destination"
                values={props.destinations}
                placeholder="No destination preference"
                allowNullValue
                valueLabel="name"
                valueKey="id"
            >
                {destinationId}
            </SelectField>
            <DateField
                label="Date you wish to start your trip"
                minDate={moment()}
            >
                {startDate}
            </DateField>
            <DateField
                label="Date you wish to end your trip (optional)"
                minDate={moment()}
            >
                {endDate}
            </DateField>
            <TextField type="text" rows={3} label="Additional information / questions">
                {notes}
            </TextField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Sign up
            </Button>
        </Form>
    );
}

SignupTripForm.propTypes = {
    destinations: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool
};

export default reduxForm({
    form: 'SignupTripForm',
    fields,
    validate
})(SignupTripForm);
