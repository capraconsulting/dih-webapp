import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../../../constants';

import AddCoordinatorForm from './addCoordinatorForm';
import { list } from '../../../../actions/userActions';
import { retrieve, update } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        },
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

class Coordinators extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.list();
        this.handlers.retrieve(this.props.params.destinationId);
    }

    filterModerators(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            if (value.role === USER_ROLES.MODERATOR || value.role === USER_ROLES.ADMIN) {
                cleanObjects.push({
                    id: value.id,
                    name: `${value.firstname} ${value.lastname}`
                });
            }
        });
        return cleanObjects;
    }

    handleSubmit(data) {
        const users = [];
        users.push(data);

        console.log({ users });

        this.handlers.update({
            users,
            id: this.props.destination.id
        })
        .then(response => {
            const message = 'Coordinator added';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
        });
    }

    render() {
        const moderators = this.filterModerators(this.props.users);
        return (
            <div>
                <AddCoordinatorForm
                    moderators={moderators}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination,
    users: store.userState.users
});

Coordinators.propTypes = {
    destination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    users: React.PropTypes.array
};

export default connect(mapStateToProps)(Coordinators);
