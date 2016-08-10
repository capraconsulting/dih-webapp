import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../../commons/pageHeader';
import Segments from '../../../../commons/Segments';
import Segment from '../../../../commons/Segment';
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
        this.state = {
            loading: true
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
        const headerTitle = `Trip to ${this.props.destination.name}`;

        return (
            <Segments loading={this.state.loading} >
                <Segment>
                    <Header
                        icon="plane"
                        content={headerTitle}
                        subContent="Manage trip"
                    />
                </Segment>
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.trip,
                    trip: this.props.trip,
                    onSubmit: e => this.onUpdate(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.tripState.trip.destination,
    trip: store.tripState.trip,
    user: store.tripState.trip.user
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
