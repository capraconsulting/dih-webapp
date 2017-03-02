import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, change } from 'redux-form';
import moment from 'moment';

import { USER_ROLES } from '../../../../constants';
import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import SelectField from '../../../../commons/Form/SelectField';

import { list } from '../../../../actions/userActions';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        },
        updateField(field, value) {
            return dispatch(change('AddCoordinatorForm', field, value));
        }
    }
);
const fields = [
    'userId',
    'startDate',
    'endDate'
];

const validate = values => {
    const errors = {};
    if (!values.userId) {
        errors.userId = 'Required';
    }
    if (!values.startDate) {
        errors.startDate = 'Required';
    }
    return errors;
};

class CoordinatorForm extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            active: false,
            loading: false,
            coordinator: null
        };
    }

    componentDidMount() {
        this.handlers.list();
    }

    filterModerators(items) {
        if (!items) return [];
        return items.filter(value => (
            value.role === USER_ROLES.MODERATOR || value.role === USER_ROLES.ADMIN
        ))
        .map(value => (
            {
                id: value.id,
                name: `${value.firstname} ${value.lastname}`
            }
        ));
    }

    toggleForm(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ active: !this.state.active });
    }

    createStyle(reverse) {
        const styles = {};
        if (!this.state.active) styles.display = 'none';
        if (reverse) styles.display = '';
        if (reverse && this.state.active) styles.display = 'none';
        return styles;
    }

    handleUserChange(user) {
        let coordinator = null;
        const coordinators = this.props.destination.users;
        coordinator = _.filter(coordinators, data => (data.id === user.id));
        coordinator = coordinator[0];
        this.setState({ coordinator });
        if (coordinator) {
            this.handlers.updateField('startDate', coordinator.destinationCoordinator.startDate);
            this.handlers.updateField('endDate', coordinator.destinationCoordinator.endDate);
        } else {
            this.handlers.updateField('startDate', '');
            this.handlers.updateField('endDate', '');
        }
    }

    render() {
        const {
            fields: { userId, startDate, endDate },
            handleSubmit
        } = this.props;

        return (
            <div>
                <div className="update-coordinator-form" style={this.createStyle()}>
                    <Form handleSubmit={handleSubmit}>
                        <SelectField
                            label="Coordinator"
                            values={this.filterModerators(this.props.users)}
                            placeholder="Select a user"
                            valueLabel="name"
                            valueKey="id"
                            required
                            onInput={user => this.handleUserChange(user)}
                        >
                            {userId}
                        </SelectField>
                        <DateField
                            label="Start date"
                            required
                        >
                            {startDate}
                        </DateField>
                        <DateField
                            label="End date"
                            minDate={startDate.value ? moment(startDate.value) : null}
                        >
                            {endDate}
                        </DateField>
                        {this.state.coordinator && <div className="ui message info">
                            {`You are now updating the coordinator ${this.state.coordinator.fullName}`}
                        </div>}
                        <div className="two ui buttons">
                            <Button onClick={e => this.toggleForm(e)}>
                                Close
                            </Button>
                            <Button
                                type="submit"
                                color="green"
                            >
                                {this.state.coordinator ? 'Update coordinator' : 'Add coordinator'}
                            </Button>
                        </div>
                    </Form>
                </div>
                <Button
                    style={{ ...this.createStyle(true), 'margin-bottom': '15px' }}
                    fluid
                    color="primary"
                    onClick={(e) => this.toggleForm(e)}
                >
                    Add or manage coordinator
                </Button>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users,
    destination: store.destinationState.destination
});

CoordinatorForm.propTypes = {
    destination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(reduxForm({
    form: 'AddCoordinatorForm',
    fields,
    validate
})(CoordinatorForm));
