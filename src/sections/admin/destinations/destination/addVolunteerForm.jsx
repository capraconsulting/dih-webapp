import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Form from '../../../../commons/Form';

const fields = ['userId', 'wishStartDate', 'wishEndDate'];

function AddVolunteerForm(props) {
    const {
        fields: { userId, wishStartDate, wishEndDate },
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

            <div className="field">
                <label htmlFor="wishStartDate">Start date</label>
                <DatePicker
                    {...wishStartDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={moment()}
                    value={wishStartDate.value ? moment(wishStartDate.value) : null}
                    selected={wishStartDate.value ? moment(wishStartDate.value) : null}
                    id="wishStartDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="wishEndDate">End date</label>
                <DatePicker
                    {...wishEndDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={wishStartDate.value ? moment(wishStartDate.value) : null}
                    value={wishEndDate.value ? moment(wishEndDate.value) : null}
                    selected={wishEndDate.value ? moment(wishEndDate.value) : null}
                    id="wishEndDate"
                    locale="en-gb"
                />
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
