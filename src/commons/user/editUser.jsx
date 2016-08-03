import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../Form';
import Button from '../Button';
import DateField from '../Form/DateField';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import TextField from '../Form/TextField';
import { USER_ROLES } from '../../constants';

const fields = ['firstname', 'lastname', 'email', 'role', 'birth', 'notes', 'volunteerInfo'];

const renderIfAdmin = (props, element) => {
    if (props.showAdminFields) {
        return element;
    }
    return '';
};

function EditUser(props) {
    const {
        fields: { firstname, lastname, email, role, birth, notes, volunteerInfo },
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
                <InputField label="E-mail" type="email">
                    {email}
                </InputField>

                {renderIfAdmin(props,
                    <SelectField
                        label="Role"
                        values={Object.keys(USER_ROLES).map((k) => ({ role: USER_ROLES[k] }))}
                        placeholder="Select a role"
                        valueLabel="role"
                        valueKey="role"
                    >
                        {role}
                    </SelectField>
                )}

                <DateField label="Date of birth">
                    {birth}
                </DateField>
                <TextField
                    rows={3}
                    label="Occupation and experience"
                    placeholder="What do you work with, and what experience do you have?"
                >
                    {volunteerInfo}
                </TextField>

                {renderIfAdmin(props,
                    <TextField rows={3} label="Notes">
                        {notes}
                    </TextField>
                )}

                <Button
                    type="submit"
                    color="green"
                    right
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

EditUser.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired,
    showAdminFields: PropTypes.bool
};

export default reduxForm({
    form: 'editUserForm',
    fields
})(EditUser);
