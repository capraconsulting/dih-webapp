import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import SelectField from '../../../../commons/Form/SelectField';


const fields = ['userId', 'wishStartDate', 'wishEndDate'];

function AddVolunteerForm(props) {
    const {
        fields: { userId, wishStartDate, wishEndDate },
        handleSubmit,
        isFetching
    } = props;

    return (
        <Form
            id="addVolunteerForm"
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
                {wishStartDate}
            </DateField>
            <DateField
                label="End date"
                minDate={wishStartDate.value ? moment(wishStartDate.value) : null}
            >
                {wishEndDate}
            </DateField>
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
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'AddVolunteerForm',
    fields
})(AddVolunteerForm);
