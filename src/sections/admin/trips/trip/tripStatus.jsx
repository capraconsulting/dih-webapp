import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '../../../../commons/Form/TextField';
import SelectField from '../../../../commons/Form/SelectField';
import Form from '../../../../commons/Form';
import Segment from '../../../../commons/Segment';
import Button from '../../../../commons/Button';
import TripInfo from '../../../../commons/trip/tripInfo';
import { TRIP_STATUSES } from '../../../../constants';
import { retrieve, update } from '../../../../actions/tripActions';
import { pushNotification } from '../../../../actions/notificationActions';

const fields = [
    'statusComment',
    'status'
];

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(body) {
            return dispatch(update(body));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class UpdateTripStatus extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            active: false
        };
    }

    createSelectObject(status) {
        const defaultValue = {
            status,
            label: _.capitalize(status)
        };
        switch (status) {
        case TRIP_STATUSES.PENDING:
            defaultValue.icon = 'blue circle';
            break;
        case TRIP_STATUSES.REJECTED:
            defaultValue.icon = 'red circle';
            break;
        case TRIP_STATUSES.ACCEPTED:
            defaultValue.icon = 'teal circle';
            break;
        case TRIP_STATUSES.ACTIVE:
            defaultValue.icon = 'yellow circle';
            break;
        case TRIP_STATUSES.NOSHOW:
            defaultValue.icon = 'black circle';
            break;
        case TRIP_STATUSES.LEFT:
            defaultValue.icon = 'orange circle';
            break;
        case TRIP_STATUSES.CLOSED:
            defaultValue.icon = 'gray circle';
            break;
        case TRIP_STATUSES.PRESENT:
            defaultValue.icon = 'green circle';
            break;
        default:
            break;
        }
        return defaultValue;
    }

    allowedActions(status) {
        const statuses = [this.createSelectObject(TRIP_STATUSES.CLOSED)];
        switch (status) {
        case TRIP_STATUSES.PENDING:
            statuses.push(this.createSelectObject(TRIP_STATUSES.ACCEPTED));
            statuses.push(this.createSelectObject(TRIP_STATUSES.REJECTED));
            break;
        case TRIP_STATUSES.ACTIVE:
            statuses.push(this.createSelectObject(TRIP_STATUSES.PRESENT));
            statuses.push(this.createSelectObject(TRIP_STATUSES.NOSHOW));
            break;
        case TRIP_STATUSES.PRESENT:
            statuses.push(this.createSelectObject(TRIP_STATUSES.LEFT));
            break;
        default:
            break;
        }
        return statuses;
    }

    toggleForm(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ active: !this.state.active });
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const body = {
            status: this.props.fields.status.value,
            statusComment: this.props.fields.statusComment.value,
            id: this.props.trip.id
        };
        this.handlers.update(body)
            .then(() => this.handlers.retrieve(this.props.params.tripId))
            .then(response => {
                const message = 'Trip status updated';
                const { error } = response;
                if (!error) {
                    this.handlers.notification(message, 'success');
                    this.setState({ active: !this.state.active });
                }
            });
    }

    createStyle(reverse) {
        const styles = {};
        if (!this.state.active) styles.display = 'none';
        if (reverse) styles.display = '';
        if (reverse && this.state.active) styles.display = 'none';
        return styles;
    }

    render() {
        return (
            <div>
                <Segment>
                    <div className="update-status-form" style={this.createStyle()}>
                        <Form>
                            <SelectField
                                label="Status"
                                placeholder={this.createSelectObject(this.props.trip.status).label}
                                icon={this.createSelectObject(this.props.trip.status).icon}
                                values={this.allowedActions(this.props.trip.status)}
                                noInitalValue
                                valueLabel="label"
                                valueKey="status"
                            >
                                {this.props.fields.status}
                            </SelectField>
                            <TextField
                                rows={3}
                                label="Status comment"
                                placeholder="Any special remarks regarding this status?"
                            >
                                {this.props.fields.statusComment}
                            </TextField>
                            <div className="two ui buttons">
                                <Button onClick={e => this.toggleForm(e)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="green"
                                    onClick={(e) => this.handleSubmit(e)}
                                >
                                    Update status
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <Button
                        style={this.createStyle(true)}
                        type="submit"
                        fluid
                        color="primary"
                        onClick={(e) => this.toggleForm(e)}
                    >
                        Change status
                    </Button>
                </Segment>
                <TripInfo trip={this.props.trip} />
            </div>
        );
    }
}

UpdateTripStatus.propTypes = {
    trip: PropTypes.object,
    onSubmit: PropTypes.func,
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
};

export default connect()(reduxForm({
    form: 'editUserForm',
    fields
})(UpdateTripStatus));
