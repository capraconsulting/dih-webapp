import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Segment from '../../../commons/Segment';
import Button from '../../../commons/Button';

// This form is not using the Form-component so it does not conflict with the methods of editTrip
function CancelTrip(props) {
    const {
        isFetching
    } = props;

    return (
        <Segment>
            <h3>Do you really want to cancel your trip to {props.trip.destination.name}?</h3>
            <p>
                You can cancel your trip at any time - we don't ask questions. If you at a later
                time want to go on a trip again, just go to
                the <Link to="/trips/signup">sign up for a trip</Link> page.
            </p>
            <p>
                If you're unsure about your trip, or have any questions at all,
                please contact us so we can help you.
                You can contact us <a target="_blank" rel="noopener noreferrer" href="http://www.drapenihavet.no/en/contact/">here</a>.
            </p>
            <form
                id="cancelTripForm"
                onSubmit={e => {
                    e.preventDefault();
                    props.onCancel(e);
                }}
            >
                <Button
                    type="submit"
                    color="red"
                    fluid
                    loading={isFetching}
                    id="submit"
                >
                    Confirm cancelation of trip
                </Button>
            </form>
        </Segment>
    );
}

CancelTrip.propTypes = {
    trip: React.PropTypes.object.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    errorMessage: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};

export default reduxForm({
    form: 'cancelTripForm',
    fields: []
})(CancelTrip);
