import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


import Header from '../../../../commons/pageHeader';
import List from '../../../../commons/list';
import ListItem from '../../../../commons/list/listItem';
import FluidListItem from '../../../../commons/list/fluidListItem';
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
                </div>
                <div className="ui segment">
                    <List>
                        <ListItem
                            name="First name"
                            icon="user"
                            content={this.props.user.firstname}
                        />
                        <ListItem
                            name="Last name"
                            icon="user"
                            content={this.props.user.lastname}
                        />
                        <ListItem
                            name="E-mail"
                            icon="at"
                            content={this.props.user.email}
                        />
                        <ListItem
                            name="Age"
                            icon="birthday"
                            content={moment(this.props.user.birth).fromNow(true)}
                        />
                        <ListItem
                            name="Birthday"
                            icon="birthday"
                            content={moment(this.props.user.birth).calendar()}
                        />
                        <FluidListItem
                            name="Occupation and experience"
                            icon="student"
                            content={this.props.user.volunteerInfo}
                        />
                    </List>
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
    destination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    trip: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
