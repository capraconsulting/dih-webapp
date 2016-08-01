import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../../../../commons/Form';
import Button from '../../../../commons/Button';

function DeactivateDestinationForm(props) {
    const {
        handleSubmit,
        errorMessage,
        isFetching
    } = props;

    return (
        <div>
            <Form
                id="deactivateDestinationForm"
                errorMessage={errorMessage}
                handleSubmit={handleSubmit}
            >
                <Button
                    type="submit"
                    color="red"
                    disabled={!props.destination.isActive}
                    loading={isFetching}
                    id="submit"
                >
                    {props.destination.isActive ?
                        'Deactivate destination' : 'Destination is inactive'
                     }
                </Button>
            </Form>
        </div>
    );
}

DeactivateDestinationForm.propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    destination: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'deactivateDestinationForm',
    fields: []
})(DeactivateDestinationForm);
