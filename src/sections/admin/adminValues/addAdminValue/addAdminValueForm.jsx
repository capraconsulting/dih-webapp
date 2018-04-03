import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { forEach } from 'lodash';

import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import InputField from '../../../../commons/Form/InputField';
import TextField from '../../../../commons/Form/TextField';


const fields = ['title', 'description', 'value'];

const validate = values => {
    const errors = {};
    const errorMessageForRequiredField = 'Required';
    forEach(fields, value => {
        if (!values[value]) {
            errors[value] = errorMessageForRequiredField;
        }
    });
    return errors;
};


function AddDestinationForm(props) {
    const {
        fields: { title, description, value },
        errorMessage,
        handleSubmit,
        isFetching
    } = props;

    return (
        <Form
            id="addAdminValueForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <InputField label="Title" type="text" required>
                {title}
            </InputField>
            <TextField label="Value" rows={5} type="text" required>
                {value}
            </TextField>
            <TextField rows={5} placeholder="Describe the value" required>
                {description}
            </TextField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Add value
            </Button>
        </Form>
    );
}

AddDestinationForm.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
};

export default reduxForm({
    form: 'addAdminValueForm',
    fields,
    validate
})(AddDestinationForm);
