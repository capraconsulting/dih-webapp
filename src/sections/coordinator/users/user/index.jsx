import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../../commons/pageHeader';
import ViewUser from '../../../../commons/user/viewUser';
import { retrieve } from '../../../../actions/userActions';

const createHandlers = dispatch => id => dispatch(retrieve(id));

class User extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.userId);
    }

    render() {
        return (
            <div className="ui segment clearing">
                <Header
                    icon="user"
                    content={`${this.props.user.firstname} ${this.props.user.lastname}`}
                    subContent="View user"
                />
                <ViewUser user={this.props.user} />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.userState.user
});

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
