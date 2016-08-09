import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import SelectField from '../../../../commons/Form/SelectField';
import TextField from '../../../../commons/Form/TextField';

const fields = ['userId', 'startDate', 'endDate', 'notes'];

const validate = values => {
    const errors = {};
    if (!values.userId) {
        errors.userId = 'Required';
    }
    if (!values.startDate) {
        errors.startDate = 'Required';
    }
    return errors;
};

function AddVolunteerForm(props) {
    const {
        fields: { userId, startDate, endDate, notes },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Form
            id="addVolunteerForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <SelectField
                label="Volunteer"
                values={props.users}
                placeholder="Select an user"
                valueLabel="fullname"
                valueKey="id"
            >
                {userId}
            </SelectField>
            <DateField
                label="Start date"
                minDate={moment()}
            >
                {startDate}
            </DateField>
            <DateField
                label="End date"
                minDate={startDate.value ? moment(startDate.value) : null}
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
                Add volunteer
            </Button>
        </Form>
    );
}

AddVolunteerForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'AddVolunteerForm',
    fields,
    validate
})(AddVolunteerForm);
