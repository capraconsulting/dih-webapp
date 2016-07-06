import React from 'react';
import DatePicker from 'react-datepicker';
import { reduxForm } from 'redux-form';
import moment from 'moment';

const fields = ['startDate', 'endDate', 'hotel', 'notes'];

function UpdateTripForm(props) {
    const {
        fields: { startDate, endDate, hotel, notes },
        handleSubmit,
        submitting
    } = props;

    return (
        <form id="updateTripForm" className="ui form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="startDate">Start date</label>
                <DatePicker
                    {...startDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={moment()}
                    selected={startDate.value ? moment(startDate.value) : null}
                    id="startDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="endDate">End date</label>
                <DatePicker
                    {...endDate}
                    dateFormat="YYYY-MM-DD"
                    placeholderText="YYYY-MM-DD"
                    minDate={startDate.value ? moment(startDate.value) : moment()}
                    selected={endDate.value ? moment(endDate.value) : null}
                    id="endDate"
                    locale="en-gb"
                />
            </div>

            <div className="field">
                <label htmlFor="hotel">Hotel</label>
                <input
                    type="text"
                    id="hotel"
                    {...hotel}
                />
            </div>

            <div className="field">
                <label htmlFor="notes">Notes</label>
                <textarea
                    {...notes}
                    value={notes.value || ''}
                />
            </div>

            <button
                type="submit"
                className="ui button primary"
                disabled={submitting}
            >
                Update trip
            </button>
        </form>
    );
}

UpdateTripForm.propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'UpdateTripForm',
    fields
})(UpdateTripForm);
