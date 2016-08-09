import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../../constants';
import Segment from '../../../../commons/Segment';
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
        const user = data;
        user.userId = parseInt(user.userId, 10);

        if (!user.endDate) user.endDate = null;

        const payload = {
            users: [user],
            id: this.props.params.destinationId
        };

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
            <Segment loading={this.state.loading} >
                <AddCoordinatorForm
                    moderators={this.filterModerators(this.props.users)}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
            </Segment>
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
