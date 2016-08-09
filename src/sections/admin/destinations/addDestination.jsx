import React, { PropTypes } from 'react';
import { create } from '../../../actions/destinationActions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AddDestinationForm from './addDestinationForm';
import { pushNotification } from '../../../actions/notificationActions';

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

class AddDestination extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(props.dispatch);
    }

    handleSubmit(data) {
        this.handlers.create(data)
            .then(response => {
                const message = 'Destination added';
                const { error } = response;
                if (!error) {
                    this.handlers.notification(message, 'success');
                    browserHistory.push('/admin/destinations');
                }
            });
    }

    render() {
        return (
            <AddDestinationForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

AddDestination.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect()(AddDestination);
