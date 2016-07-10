import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../../../../commons/Form';

const fields = ['userId'];

function AddVolunteerForm(props) {
    const {
        fields: { userId },
        handleSubmit,
        submitting
    } = props;

    return (
        <Form
            id="addVolunteerForm"
            handleSubmit={handleSubmit}
        >
            <div className="field">
                <label htmlFor="volunteer">Volunteer</label>
                <select
                    {...userId}
                    value={userId.value || ''}
                    className="ui fluid selection dropdown"
                >
                    {props.users.map(user => (
                        <option
                            value={user.id}
                            key={user.id}
                        >
                            {user.firstname} {user.lastname}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Add volunteer
            </button>
        </Form>
    );
}

AddVolunteerForm.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired
};

export default reduxForm({
    form: 'AddVolunteerForm',
    fields
})(AddVolunteerForm);
