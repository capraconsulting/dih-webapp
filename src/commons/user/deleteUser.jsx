import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../Form';
import Button from '../Button';
import Segment from '../Segment';


function DeleteUser(props) {
    const {
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <Segment>
            <div className="ui message">
                If you do
            </div>
            <Form
                id="deleteUserForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >

                <Button
                    type="submit"
                    color="red"
                    fluid
                    disabled={isFetching}
                    loading={isFetching}
                    id="submit"
                >
                    Delete user
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
    form: 'deleteUserForm'
})(DeleteUser);
