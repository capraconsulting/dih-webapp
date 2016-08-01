import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { retrieve, update, destroy } from '../../../../actions/userActions';
import { pushNotification } from '../../../../actions/notificationActions';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(user) {
            return dispatch(update(user));
        },
        destroy(user) {
            return dispatch(destroy(user));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class User extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'View',
                    uri: `/admin/users/${this.props.params.userId}`
                },
                {
                    name: 'Edit',
                    uri: `/admin/users/${this.props.params.userId}/edit`
                },
                {
                    name: 'Trips',
                    uri: `/admin/users/${this.props.params.userId}/trips`
                },
                {
                    name: 'Messages',
                    uri: `/admin/users/${this.props.params.userId}/messages`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.userId);
    }

    onUpdate(user) {
        this.handlers.update({ id: this.props.params.userId, ...user })
            .then(response => {
                const message = 'User changes saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
            })
            .then(() => this.handlers.retrieve(this.props.params.userId));
    }

    render() {
        return (
            <div className="ui segment clearing">
                <Header
                    icon="user"
                    content={`${this.props.user.firstname} ${this.props.user.lastname}`}
                    subContent="Manage userprofile"
                />
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.user,
                    user: this.props.user,
                    onSubmit: e => this.onUpdate(e)
                })}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
});

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
