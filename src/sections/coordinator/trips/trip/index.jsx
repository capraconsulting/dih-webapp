import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';
import Segments from '../../../../commons/Segments';
import Segment from '../../../../commons/Segment';
import { retrieve } from '../../../../actions/tripActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = dispatch => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
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
            loading: true,
            pages: [
                {
                    name: 'View trip',
                    uri: `/coordinator/trips/${this.props.params.tripId}`
                },
                {
                    name: 'View user',
                    uri: `/coordinator/trips/${this.props.params.tripId}/user`
                }
            ]
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <Segments loading={this.state.loading}>
                <Segment>
                    <Header
                        icon="user"
                        content={`Trip to ${this.props.trip.destination.name}`}
                        subContent={
                            `For user ${this.props.user.firstname} ${this.props.user.lastname}`
                        }
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    user: this.props.user,
                    trip: this.props.trip,
                    account: this.props.account
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    trip: store.tripState.trip,
    user: store.tripState.trip.user,
    account: store.accountState.account
});

User.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
