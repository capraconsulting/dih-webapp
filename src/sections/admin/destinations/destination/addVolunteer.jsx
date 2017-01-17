import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Segment from '../../../../commons/Segment';

import AddVolunteerForm from './addVolunteerForm';
import { create } from '../../../../actions/tripActions';
import { list } from '../../../../actions/userActions';
import { pushNotification } from '../../../../actions/notificationActions';

import { TRIP_STATUSES } from '../../../../constants';

const createHandlers = (dispatch) => (
    {
        create(data) {
            return dispatch(create(data));
        },
        list() {
            return dispatch(list());
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class AddVolunteer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.list()
            .then(() => {
                this.setState({ loading: false });
            });
    }

    handleSubmit(data) {
        const alteredData = {
            ...data,
            startDate: data.startDate,
            endDate: data.endDate,
            wishStartDate: data.startDate, // Cannot be null. Not used.
            destinationId: this.props.params.destinationId,
            status: TRIP_STATUSES.ACCEPTED,
            notes: data.notes
        };
        this.handlers.create(alteredData)
        .then(response => {
            const message = 'Volunteer added';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
            browserHistory.push(`/admin/destinations/${this.props.params.destinationId}`);
        });
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <AddVolunteerForm
                    users={this.props.users}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
            </Segment>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

AddVolunteer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AddVolunteer);
