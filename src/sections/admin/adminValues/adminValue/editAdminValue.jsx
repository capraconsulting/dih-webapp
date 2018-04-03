import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';
import Segment from '../../../../commons/Segment';
import InputField from '../../../../commons/Form/InputField';
import TextField from '../../../../commons/Form/TextField';

const fields = [
    'title',
    'description',
    'value'
];


const EditAdminValue = props => {
    const {
        fields: {
            title,
            description,
            value
        },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Segment>
            <Form
                id="editAdminValueForm"
                handleSubmit={handleSubmit}
                errorMessage={errorMessage}
            >
                <InputField
                    label={`The title of the value. This cannot be edited, 
                    as the system is dependent on the value not changing.`}
                    type="text"
                    id="title"
                >
                    {title}
                </InputField>
                <TextField
                    label="Description of what the value is. E.g. what page it's shown on."
                    id="description"
                    required
                    rows={4}
                >
                    {description}
                </TextField>

                <TextField
                    label="The actual value. This is shown to the users."
                    id="value"
                    required
                    rows={4}
                >
                    {value}
                </TextField>

                <Button
                    type="submit"
                    color="green"
                    fluid
                    loading={isFetching}
                    id="submit"
                >
                    Save
                </Button>
            </Form>
        </Segment>
    );
};

EditAdminValue.propTypes = {
    fields: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default reduxForm({
    form: 'editAdminValueForm',
    fields
})(EditAdminValue);
