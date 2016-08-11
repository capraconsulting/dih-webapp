import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { USER_ROLES, TRIP_STATUSES } from '../../../../constants';
import { retrieve } from '../../../../actions/destinationActions';
import Header from '../../../../commons/pageHeader';
import Segments from '../../../../commons/Segments';
import Segment from '../../../../commons/Segment';
import AdminTripTable from '../../../../commons/adminTripTable';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.handlers = createHandlers(this.props.dispatch);
        this.statuses = [
            TRIP_STATUSES.ACTIVE,
            TRIP_STATUSES.PRESENT,
            TRIP_STATUSES.LEFT,
            TRIP_STATUSES.NOSHOW
        ];
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <Segments loading={this.state.loading}>
                <Segment>
                    <Header
                        icon="marker"
                        content={this.props.destination.name}
                        subContent="Manage destination"
                    />
                </Segment>
                <AdminTripTable
                    destinationId={parseInt(this.props.params.destinationId, 10)}
                    role={USER_ROLES.MODERATOR}
                    statuses={this.statuses}
                />
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination
});

Destination.propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    destination: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Destination);
