import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';
import DateField from '../../../../commons/Form/DateField';
import InputField from '../../../../commons/Form/InputField';
import ToggleField from '../../../../commons/Form/ToggleField';

const fields = ['name', 'minimumTripDurationInDays', 'startDate', 'endDate', 'isActive'];

function EditDestinationForm(props) {
    const {
        fields: { name, minimumTripDurationInDays, startDate, endDate, isActive },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Form
            id="editDestinationForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <InputField label="Name" type="text" required>
                {name}
            </InputField>
            <InputField
                label="The mimimum number of days a volunteer has to be at the destination"
                type="number"
                required
            >
                {minimumTripDurationInDays}
            </InputField>
            <DateField label="Start date" required>
                {startDate}
            </DateField>
            <DateField
                minDate={moment()}
                label="End date"
            >
                {endDate}
            </DateField>
            <ToggleField
                id="isActiveToggle"
                label="Toggle this destination to be active or inactive.
                Users can only sign up for active destinations.
                Toggling this changes the end date."
                name="Active"
            >
                {isActive}
            </ToggleField>
            <Button
                type="submit"
                color="green"
                disabled={isFetching}
                loading={isFetching}
                id="submit"
                right
            >
                Save changes
            </Button>
        </Form>
    );
}

EditDestinationForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    destination: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'editDestinationForm',
    fields
})(EditDestinationForm);
