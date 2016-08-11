import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../Form';
import Button from '../Button';
import Segment from '../Segment';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import TextField from '../Form/TextField';
import ToggleField from '../Form/ToggleField';
import DateField from '../Form/DateField';
import { USER_ROLES, GENDERS } from '../../constants';
import { emailIsValid } from '../../helpers';

const fields = [
    'firstname', 'lastname', 'phoneNumber', 'email', 'role', 'birth',
    'notes', 'volunteerInfo', 'readTerms', 'addressLine1', 'addressLine2',
    'postalCode', 'city', 'country'
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
        fields: { firstname, lastname, email, phoneNumber,
            role, birth, notes, volunteerInfo, readTerms,
            addressLine1, addressLine2, postalCode, city, country
        },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Segment>
            <Form
                id="editUserForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >
                <InputField label="First name" type="text" required>
                    {firstname}
                </InputField>
                <InputField label="Last name" type="text" required>
                    {lastname}
                </InputField>
                <SelectField
                    label="Gender"
                    values={Object.keys(GENDERS).map((k) => ({ gender: GENDERS[k] }))}
                    placeholder="Select your gender"
                    valueLabel="gender"
                    valueKey="gender"
                >
                    {role}
                </SelectField>
                <DateField
                    label="Date of birth"
                    placeholder="YYYY-MM-DD"
                    required
                >
                    {birth}
                </DateField>
                <InputField label="E-mail" type="email" required>
                    {email}
                </InputField>
                <InputField label="Phone number" type="tel" required>
                    {phoneNumber}
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

                <InputField
                    label="Address line 1"
                    placeholder="Your Address"
                    type="text"
                >
                {addressLine1}
                </InputField>
                <InputField
                    label="Address line 2"
                    placeholder="Second adress line in case you have a long address"
                    type="text"
                >
                {addressLine2}
                </InputField>
                <InputField
                    label="Postal code"
                    type="text"
                >
                {postalCode}
                </InputField>
                <InputField
                    label="City"
                    type="text"
                >
                {city}
                </InputField>
                <InputField
                    label="Country of residence"
                    placeholder="Where you live"
                    type="text"
                >
                {country}
                </InputField>
                <TextField
                    rows={3}
                    label="Occupation and experience"
                    placeholder="What do you work with, and what experience do you have?"
                    required
                >
                    {volunteerInfo}
                </TextField>

                {renderIfAdmin(props,
                    <TextField
                        rows={3}
                        label="Notes (only visible to administrators and coordinators)"
                    >
                        {notes}
                    </TextField>
                )}

                {renderIfAdmin(props,
                    <ToggleField
                        name="Guidelines for A Drop in the Ocean"
                        label={`User confirmation of reading the guidelines.
                        <a target="_blank" rel="noopener noreferrer" href="http://www.drapenihavet.no/en/guidelines">
                        Click here to read the guidelines.</a>`}
                        id="readTerms"
                    >
                        {readTerms}
                    </ToggleField>
                ,
                    <ToggleField
                        name="Guidelines for A Drop in the Ocean"
                        label={`I confirm that I have read the guidelines for A Drop in the Ocean.
                        <a target="_blank" rel="noopener noreferrer" href="http://www.drapenihavet.no/en/guidelines">
                        Click here to read the guidelines.</a>`}
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
        </Segment>
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
