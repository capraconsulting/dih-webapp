import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import { USER_ROLES } from '../../../../constants';
import Button from '../../../../commons/Button';
import Form from '../../../../commons/Form';
import DateField from '../../../../commons/Form/DateField';
import SelectField from '../../../../commons/Form/SelectField';

import { list } from '../../../../actions/userActions';

const createHandlers = (dispatch) => () => dispatch(list());

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
            loading: false
        };
    }

    componentDidMount() {
        this.handlers();
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
                            placeholder="Select an user"
                            valueLabel="name"
                            valueKey="id"
                            required
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
                        <div className="two ui buttons">
                            <Button onClick={e => this.toggleForm(e)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="green"
                            >
                                Add coordinator
                            </Button>
                        </div>
                    </Form>
                </div>
                <Button
                    style={this.createStyle(true)}
                    fluid
                    color="primary"
                    onClick={(e) => this.toggleForm(e)}
                >
                    Add or manage coordiantor
                </Button>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

CoordinatorForm.propTypes = {
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
