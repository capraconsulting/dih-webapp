import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../../commons/pageHeader';
import { retrieve } from '../../../../actions/tripActions';
import { retrieve as retrieveDestination } from '../../../../actions/destinationActions';
import { retrieve as retrieveUser } from '../../../../actions/userActions';


const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        retrieveDestination(id) {
            return dispatch(retrieveDestination(id));
        },
        retrieveUser(id) {
            return dispatch(retrieveUser(id));
        }
    }
);

class Trip extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.tripId)
        .then(() => {
            this.handlers.retrieveDestination(this.props.trip.destinationId);
            this.handlers.retrieveUser(this.props.trip.userId);
        });
    }

    render() {
        const headerTitle = `Trip to ${this.props.destination.name}`;

        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        icon="plane"
                        content={headerTitle}
                        subContent="Manage trip"
                    />
                    {React.cloneElement(this.props.children, {
                        initialValues: this.props.trip,
                        trip: this.props.trip,
                        onSubmit: e => this.onUpdate(e)
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination,
    trip: store.tripState.trip,
    user: store.userState.user
});

Trip.propTypes = {
    children: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
