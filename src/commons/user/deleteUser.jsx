import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../Form';
import ToggleField from '../Form/ToggleField';
import Button from '../Button';
import Segment from '../Segment';

const fields = ['isActive'];


function DeleteUser(props) {
    const {
        fields: { isActive },
        handleSubmit,
        errorMessage,
        isFetching
    } = props;
    return (
        <Segment>
            <Form
                id="deleteUserForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >
                <ToggleField
                    name="I confirm that I want to delete my account"
                    label={`Deleting your account means that you will have to register again
                    if you want to go on a new trip. Toggling this button and confirming will
                    delete your account, and log you out.`}
                    id="isActive"
                >
                    {isActive}
                </ToggleField>
                <Button
                    type="submit"
                    color="red"
                    fluid
                    disabled={!isActive.value}
                    loading={isFetching}
                    id="submit"
                >
                    Confirm deletion
                </Button>
            </Form>
        </Segment>
    );
}

DeleteUser.propTypes = {
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
    form: 'deleteUserForm',
    fields
})(DeleteUser);
