import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../commons/pageHeader';
import Navbar from '../../../commons/navbar';
import { retrieve, update } from '../../../actions/tripActions';
import { pushNotification } from '../../../actions/notificationActions';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(data) {
            return dispatch(update(data));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class Trip extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'View',
                    uri: `/trips/${this.props.params.tripId}`
                },
                {
                    name: 'Edit',
                    uri: `/trips/${this.props.params.tripId}/edit`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId);
    }

    onUpdate(trip) {
        this.handlers.update({ ...trip, id: this.props.params.tripId })
        .then(response => {
            const message = 'Trip changes saved!';
            const { error } = response;
            if (!error) this.handlers.notification(message, 'success');
            if (error) this.handlers.notification('There was a problem. Try again later.', 'error');
        })
        .then(() => this.handlers.retrieve(this.props.params.tripId));
    }

    render() {
        return (
            <div className="ui segment clearing">
                <Header
                    icon="plane"
                    subContent="Manage your trip"
                />
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.trip,
                    trip: this.props.trip,
                    onSubmit: (e) => this.onUpdate(e)
                })}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    trip: store.tripState.trip
});

Trip.propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
