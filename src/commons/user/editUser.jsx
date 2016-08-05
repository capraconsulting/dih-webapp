import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../Form';
import Button from '../Button';
import DateField from '../Form/DateField';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import TextField from '../Form/TextField';
import ToggleField from '../Form/ToggleField';
import { USER_ROLES } from '../../constants';
import { emailIsValid } from '../../helpers';

const fields = [
    'firstname', 'lastname', 'email', 'role', 'birth', 'notes', 'volunteerInfo', 'readTerms'
];

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!emailIsValid(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.lastname) {
        errors.lastname = 'Required';
    }
    if (!values.firstname) {
        errors.firstname = 'Required';
    }
    if (!values.birth) {
        errors.birth = 'Required';
    }
    if (!values.volunteerInfo) {
        errors.volunteerInfo = 'Required. Please tell us about yourself!';
    }
    return errors;
};

const renderIfAdmin = (props, elementForAdmin, elementForUser) => {
    if (props.showAdminFields) {
        return elementForAdmin;
    }
    return elementForUser || '';
};

function EditUser(props) {
    const {
        fields: { firstname, lastname, email, role, birth, notes, volunteerInfo, readTerms },
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

                <DateField
                    label="Date of birth"
                    placeholder="YYYY-MM-DD"
                >
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
                    <TextField rows={3} label="Notes (only seen by administrators)">
                        {notes}
                    </TextField>
                )}

                {renderIfAdmin(props,
                    <ToggleField
                        name="Guidelines for A Drop in the Ocean"
                        label={`User confirmation of reading the guidelines.
                        <a target="_blank" rel="noopener noreferrer" href="http://www.drapenihavet.no/wp-content/uploads/2016/07/Guidelines-for-volunteer-workers-July.16.pdf">
                        Click here to read the guidelines</a>.`}
                        id="readTerms"
                    >
                        {readTerms}
                    </ToggleField>
                ,
                    <ToggleField
                        name="Guidelines for A Drop in the Ocean"
                        label={`I confirm that I have read the guidelines for A Drop in the Ocean.
                        <a target="_blank" rel="noopener noreferrer" href="http://www.drapenihavet.no/wp-content/uploads/2016/07/Guidelines-for-volunteer-workers-July.16.pdf">
                        Click here to read the guidelines</a>.`}
                        id="readTerms"
                    >
                        {readTerms}
                    </ToggleField>
                )}

                <Button
                    type="submit"
                    color="green"
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
    fields,
    validate
})(EditUser);
