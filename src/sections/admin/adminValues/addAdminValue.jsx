import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Segment from '../../../commons/Segment';
import { create } from '../../../actions/adminValuesActions';
import { pushNotification } from '../../../actions/notificationActions';
import AddAdminValueForm from './addAdminValueForm';

const createHandlers = (dispatch) => (
    {
        create(data) {
            return dispatch(create(data));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class AddAdminValue extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(props.dispatch);
    }

    handleSubmit(data) {
        this.handlers.create(data)
            .then(response => {
                const message = 'Admin value added';
                const { error } = response;
                if (!error) {
                    this.handlers.notification(message, 'success');
                    browserHistory.push('/admin/values');
                }
            });
    }

    render() {
        return (
            <Segment>
                <AddAdminValueForm
                    onSubmit={e => { this.handleSubmit(e); }}
                />
            </Segment>
        );
    }
}

AddAdminValue.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect()(AddAdminValue);
