import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../../constants';

import AddCoordinatorForm from './addCoordinatorForm';
import { list } from '../../../../actions/userActions';
import { update } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        },
        update(destination) {
            return dispatch(update(destination));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class AddCoordinator extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
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

    handleSubmit(data) {
        const payload = {
            users: [data],
            id: this.props.params.destinationId
        };
        payload.users[0].userId = parseInt(payload.users[0].userId, 10);

        this.handlers.update(payload)
        .then(response => {
            const message = 'Coordinator added';
            const { error } = response;
            if (!error) {
                this.handlers.notification(message, 'success');
            }
        });
    }

    render() {
        return (
            <AddCoordinatorForm
                moderators={this.filterModerators(this.props.users)}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

AddCoordinator.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    users: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AddCoordinator);
