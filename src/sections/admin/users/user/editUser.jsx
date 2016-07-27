import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import InputField from '../../../../commons/Form/InputField';
import SelectField from '../../../../commons/Form/SelectField';
import TextField from '../../../../commons/Form/TextField';
import { USER_ROLES } from '../../../../constants';

const fields = ['firstname', 'lastname', 'email', 'role', 'birth', 'notes'];

const validate = values => {
    const errors = {};
    if (!values.userId) {
        errors.userId = 'Required';
    }
    if (!values.wishStartDate) {
        errors.wishStartDate = 'Required';
    }
    if (!values.wishEndDate) {
        errors.wishEndDate = 'Required';
    }
    return errors;
};

function AddVolunteerForm(props) {
    const {
        fields: { firstname, lastname, email, role, birth, notes },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    console.log(props);
    return (
        <Form
            id="addVolunteerForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <InputField label="First name" type="text" initialValue={props.user.firstname}>
                {firstname}
            </InputField>
            <InputField label="Last name" type="text" initialValue={props.user.lastname}>
                {lastname}
            </InputField>
            <InputField label="Email" type="email" initialValue={props.user.email}>
                {email}
            </InputField>
            <SelectField
                label="Role"
                values={Object.keys(USER_ROLES).map((k) => ({ role: USER_ROLES[k] }))}
                placeholder="Select a role"
                valueLabel="role"
                valueKey="role"
            >
                {role}
            </SelectField>
            <DateField label="birth" initialValue={moment(props.user.birth)}>
                {birth}
            </DateField>
            <TextField rows={3} label="notes" initialValue={props.user.notes}>
                {notes}
            </TextField>
        </Form>
    );
}

AddVolunteerForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'editUserForm',
    fields,
    validate
})(AddVolunteerForm);
