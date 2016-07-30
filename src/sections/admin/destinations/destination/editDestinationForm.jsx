import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';
import DateField from '../../../../commons/Form/DateField';
import InputField from '../../../../commons/Form/InputField';

const fields = ['name', 'minimumTripDurationInDays', 'startDate', 'endDate'];

function EditDestinationForm(props) {
    const {
        fields: { name, minimumTripDurationInDays, startDate, endDate },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <div>
            <Form
                id="editDestinationForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >
                <InputField label="Name" type="text">
                    {name}
                </InputField>
                <InputField
                    label="The mimimum number of days a volunteer has to be at the destination"
                    type="number"
                >
                    {minimumTripDurationInDays}
                </InputField>
                <DateField label="Start date">
                    {startDate}
                </DateField>
                <DateField
                    minDate={moment()}
                    label="End date"
                >
                    {endDate}
                </DateField>
                <Button
                    type="submit"
                    color="green"
                    disabled={isFetching}
                    loading={isFetching}
                    id="submit"
                >
                    Save changes
                </Button>
            </Form>
        </div>
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
