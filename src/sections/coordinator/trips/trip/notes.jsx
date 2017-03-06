import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';
import TextField from '../../../../commons/Form/TextField';

const fields = ['notes'];

function EditNotes(props) {
    const {
        fields: { notes },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Form
            id="notesForm"
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
        >
            <TextField rows={3} label="Notes (only seen by coordinators and admins)">
                {notes}
            </TextField>
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
    );
}

EditNotes.propTypes = {
    errorMessage: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    submitting: PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'notesForm',
    fields
})(EditNotes);
