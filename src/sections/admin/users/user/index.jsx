import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { retrieve } from '../../../../actions/userActions';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';
import UserInfo from './userInfo';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class User extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'User info',
                    uri: `/admin/users/${this.props.params.userId}`
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
        this.handlers(this.props.params.userId);
    }

    render() {
        return (
            <div className="ui segment">
                <Header
                    icon="user"
                    content={`${this.props.user.firstname} ${this.props.user.lastname}`}
                    subContent="Manage userprofile"
                />
                <Navbar pages={this.state.pages} />
                <UserInfo user={this.props.user} />
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
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
