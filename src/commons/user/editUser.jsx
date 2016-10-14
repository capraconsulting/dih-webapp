import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import Form from '../Form';
import Button from '../Button';
import Segment from '../Segment';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import TextField from '../Form/TextField';
import ToggleField from '../Form/ToggleField';
import { USER_ROLES, GENDERS, USER_MEDICAL_DEGREES, COUNTRIES } from '../../constants';
import { emailIsValid } from '../../helpers';

const fields = [
    'firstname', 'lastname', 'gender', 'phoneNumber', 'email', 'role', 'birth',
    'notes', 'volunteerInfo', 'readTerms', 'addressLine1', 'addressLine2',
    'postalCode', 'city', 'country', 'medicalDegree', 'medicalDegreeLicenseNumber',
    'nationality', 'languages', 'emergencyContactInfo'
];

const validate = (values, component) => {
    const disableValidation = component.disableValidation || false;
    if (disableValidation) return {};
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
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Required';
    }
    if (values.phoneNumber && values.phoneNumber[0] !== '+') {
        errors.phoneNumber = 'The country code needs to start with a plus-sign, i.e. +47.';
    }
    if (!values.birth) {
        errors.birth = 'Required';
    }
    if (values.birth && !moment(values.birth).isValid()) {
        errors.birth = 'The date has to be written on the format YYYY-MM-DD';
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

const renderIfFieldIsFilled = (field, element) => {
    if (field.value && field.value.length > 0) return element;
    return '';
};
let firstRenderIsDone = false; // Set to true on first render

function EditUser(props) {
    const {
        fields: { firstname, lastname, email, phoneNumber, gender,
            role, birth, notes, volunteerInfo, readTerms,
            addressLine1, addressLine2, postalCode, city, country,
            medicalDegree, medicalDegreeLicenseNumber, nationality,
            languages, emergencyContactInfo
        },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    if (!birth.valid && !firstRenderIsDone) {
        birth.value = ''; // Remove 'Invalid date' for new users
    }

    if (!firstRenderIsDone) {
        firstRenderIsDone = true;
    }

    return (
        <Segment>
            <div className="ui message">
                Fields marked with <span className="required">*</span> are
                <strong> required</strong>, but we appreciate that you make your
                profile as detailed as possible.
            </div>
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
                    {gender}
                </SelectField>
                <InputField
                    label="Date of birth (YYYY-MM-DD)"
                    placeholder="YYYY-MM-DD"
                    required={props.user.role !== USER_ROLES.ADMIN}
                >
                {birth}
                </InputField>
                <InputField
                    label="E-mail"
                    type="email"
                    required={props.user.role !== USER_ROLES.ADMIN}
                >
                    {email}
                </InputField>
                <InputField
                    label="Phone number (include the country code in front of the number)"
                    type="tel"
                    placeholder="+0012345678"
                    required={props.user.role !== USER_ROLES.ADMIN}

                >
                    {phoneNumber}
                </InputField>
                <SelectField
                    label="Nationality"
                    values={Object.keys(COUNTRIES).map(key =>
                        ({ icon: `${key.toLowerCase()} flag`,
                        country: COUNTRIES[key] }))}
                    placeholder="Where you're originally from"
                    valueLabel="country"
                    valueKey="country"
                    search
                >
                    {nationality}
                </SelectField>
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
                <SelectField
                    label="Country of residence"
                    values={Object.keys(COUNTRIES).map(key =>
                        ({ icon: `${key.toLowerCase()} flag`,
                        country: COUNTRIES[key] }))}
                    placeholder="Where you live"
                    valueLabel="country"
                    valueKey="country"
                    search
                >
                {country}
                </SelectField>
                <SelectField
                    label="Medical degree"
                    values={Object.keys(USER_MEDICAL_DEGREES).map((k) =>
                        ({ degree: USER_MEDICAL_DEGREES[k] }))}
                    placeholder="Select your medical degree if you have one"
                    valueLabel="degree"
                    valueKey="degree"
                >
                    {medicalDegree}
                </SelectField>
                {renderIfFieldIsFilled(medicalDegree,
                    <InputField
                        label="License number of medical degree"
                        placeholder="License number or description"
                        type="text"
                    >
                    {medicalDegreeLicenseNumber}
                    </InputField>
                )}
                <InputField
                    label="Languages"
                    type="text"
                    placeholder="What languages do you speak?"
                >
                {languages}
                </InputField>
                <TextField
                    rows={3}
                    label="Work and experience"
                    placeholder="Fill in your occupation, work experience and/or other information you find relevant"
                    required={props.user.role !== USER_ROLES.ADMIN}
                >
                    {volunteerInfo}
                </TextField>

                <TextField
                    rows={3}
                    label="Emergency contact information"
                    placeholder="Name and phone number of your emergency contact."
                >
                    {emergencyContactInfo}
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
                        required={props.user.role !== USER_ROLES.ADMIN}
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
    showAdminFields: PropTypes.bool,
    disableValidation: PropTypes.bool,
    user: PropTypes.object
};

export default reduxForm({
    form: 'editUserForm',
    fields,
    validate
})(EditUser);
