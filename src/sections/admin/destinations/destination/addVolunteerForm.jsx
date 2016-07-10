import React from 'react';
import { reduxForm } from 'redux-form';

const fields = ['volunteer'];

function AddVolunteerForm(props) {
    const {
        fields: { volunteer },
        submitting
    } = props;

    return (
        <form id="addVolunteerForm" className="ui form" >
            <div className="field">
                <label htmlFor="volunteer">Volunteer</label>
                <select
                    {...volunteer}
                    value={volunteer.value || ''}
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
        </form>
    );
}

AddVolunteerForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    users: React.PropTypes.array.isRequired
};

export default reduxForm({
    form: 'AddVolunteerForm',
    fields
})(AddVolunteerForm);
