import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from '../../../commons/Button';
import Form from '../../../commons/Form';
import InputField from '../../../commons/Form/InputField';

const fields = ['name'];

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    return errors;
};

function AddDestinationForm(props) {
    const {
        fields: { name },
        errorMessage,
        handleSubmit,
        isFetching
    } = props;

    return (
        <Form
            id="addDestinationForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <InputField label="Name" type="text">
                {name}
            </InputField>
            <Button
                type="submit"
                color="primary"
                fluid
                disabled={isFetching}
                loading={isFetching}
                id="submit"
            >
                Add destination
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
    form: 'AddDestinationForm',
    fields,
    validate
})(AddDestinationForm);
