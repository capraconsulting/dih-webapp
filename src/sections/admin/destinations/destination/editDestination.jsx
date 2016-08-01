import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import EditDestinationForm from './editDestinationForm';
import DeactivateDestinationForm from './deactivateDestinationForm';
import { retrieve, update } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(destination) {
            return dispatch(update(destination));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class EditDestination extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.destinationId);
    }

    handleSubmit(data) {
        this.handlers.update({
            ...data,
            id: this.props.destination.id
        })
        .then(response => {
            const message = 'Destination updated';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
        });
    }

    render() {
        return (
            <div>
                <EditDestinationForm
                    initialValues={this.props.destination}
                    destination={this.props.destination}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
                <DeactivateDestinationForm
                    initialValues={this.props.destination}
                    destination={this.props.destination}
                    onSubmit={() => {
                        const destination = this.props.destination;
                        destination.endDate = moment();
                        this.handleSubmit(destination);
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination,
    isFetching: store.destinationState.isFetching
});

EditDestination.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(EditDestination);
