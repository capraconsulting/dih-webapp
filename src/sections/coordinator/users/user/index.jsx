import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../../commons/pageHeader';
import Segments from '../../../../commons/Segments';
import Segment from '../../../../commons/Segment';
import ViewUser from '../../../../commons/user/viewUser';
import { retrieve } from '../../../../actions/userActions';

const createHandlers = dispatch => id => dispatch(retrieve(id));

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.userId)
            .then(() => {
                this.setState({ loading: false });
            });
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
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
