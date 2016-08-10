import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import SelectField from '../../../../commons/Form/SelectField';

const fields = ['userId', 'startDate', 'endDate'];

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

function AddCoordinatorForm(props) {
    const {
        fields: { userId, startDate, endDate },
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
                label="Coordinator"
                values={props.moderators}
                placeholder="Select an user"
                valueLabel="name"
                valueKey="id"
            >
                {userId}
            </SelectField>
            <DateField
                label="Start date"
            >
                {startDate}
            </DateField>
            <DateField
                label="End date"
                minDate={startDate.value ? moment(startDate.value) : null}
            >
                {endDate}
            </DateField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Add coordinator
            </Button>
        </Form>
    );
}

AddCoordinatorForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    moderators: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'AddCoordinatorForm',
    fields,
    validate
})(AddCoordinatorForm);
