import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';
import DateField from '../../../../commons/Form/DateField';
import InputField from '../../../../commons/Form/InputField';
import SelectField from '../../../../commons/Form/SelectField';
import TextField from '../../../../commons/Form/TextField';
import { USER_ROLES } from '../../../../constants';

const fields = ['firstname', 'lastname', 'email', 'role', 'birth', 'notes'];

function EditUserForm(props) {
    const {
        fields: { firstname, lastname, email, role, birth, notes },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <div>
            <Form
                id="editUserForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >
                <InputField label="First name" type="text">
                    {firstname}
                </InputField>
                <InputField label="Last name" type="text">
                    {lastname}
                </InputField>
                <InputField label="Email" type="email">
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
                <DateField label="birth">
                    {birth}
                </DateField>
                <TextField rows={3} label="notes">
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
                    Save
                </Button>
            </Form>
        </div>
    );
}

EditUserForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'editUserForm',
    fields
})(EditUserForm);
