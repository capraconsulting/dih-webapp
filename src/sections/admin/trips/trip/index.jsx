import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Header from '../../../../commons/pageHeader';
import Segments from '../../../../commons/Segments';
import Navbar from '../../../../commons/navbar';
import Segment from '../../../../commons/Segment';
import { retrieve, update } from '../../../../actions/tripActions';
import { list } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(body) {
            return dispatch(update(body));
        },
        list() {
            return dispatch(list());
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pages: [
                {
                    name: 'Trip',
                    uri: `/admin/trips/${this.props.params.tripId}`
                },
                {
                    name: 'Edit trip',
                    uri: `/admin/trips/${this.props.params.tripId}/edit`
                },
                {
                    name: 'User',
                    uri: `/admin/trips/${this.props.params.tripId}/user`
                },
                {
                    name: 'Edit user',
                    uri: `/admin/users/${this.props.user.id}/edit`
                }

            ]
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId)
        .then(() => {
            this.setState({ loading: false });
            return this.handlers.list();
        });
    }

    onUpdate(trip) {
        this.handlers.update({ id: this.props.params.tripId, ...trip })
            .then(response => {
                const message = 'Trip changes saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
                browserHistory.push('/admin/trips');
                return this.handlers.retrieve(this.props.params.tripId);
            });
    }

    render() {
        return (
            <Segments loading={this.state.loading} >
                <Segment>
                    <Header
                        icon="plane"
                        content={`${this.props.destination.name ?
                            `Trip to ${this.props.destination.name}` :
                            'Trip with destination yet to be determined'}`}
                        subContent="Manage trip"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.trip,
                    trip: this.props.trip,
                    editAdmin: true,
                    user: this.props.user,
                    account: this.props.account,
                    destination: this.props.destination,
                    destinations: this.props.destinations,
                    onSubmit: e => this.onUpdate(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations,
    destination: store.tripState.trip.destination,
    trip: store.tripState.trip,
    user: store.tripState.trip.user,
    account: store.accountState.account
});

Trip.propTypes = {
    children: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    destinations: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
