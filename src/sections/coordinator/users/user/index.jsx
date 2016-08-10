import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Header from '../../../../commons/pageHeader';
import Segments from '../../../../commons/Segments';
import Segment from '../../../../commons/Segment';
import ViewUser from '../../../../commons/user/viewUser';
import { retrieve, update } from '../../../../actions/userActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = dispatch => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(user) {
            return dispatch(update(user));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'View',
                    uri: `/coordinator/users/${this.props.params.userId}`
                },
                {
                    name: 'Notes',
                    uri: `/coordinator/users/${this.props.params.userId}/notes`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers(this.props.params.userId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    handleSubmit(user) {
        const userId = parseInt(this.props.params.userId, 10);
        this.handlers.update({ id: userId, notes: user.notes })
            .then(response => {
                const message = 'User changes saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
            })
            .then(() => this.handlers.retrieve(this.props.params.userId))
            .then(() => browserHistory.push(`/coordinator/users/${userId}`));
    }

    render() {
        return (
            <Segments clearing loading={this.state.loading}>
                <Segment>
                    <Header
                        icon="user"
                        content={`${this.props.user.firstname} ${this.props.user.lastname}`}
                        subContent="View user"
                    />
                </Segment>
                <ViewUser user={this.props.user} />
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
});

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
