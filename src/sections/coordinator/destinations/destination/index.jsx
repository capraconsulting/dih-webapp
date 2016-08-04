import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../../constants';
import { retrieve } from '../../../../actions/destinationActions';
import Header from '../../../../commons/pageHeader';
import AdminTripTable from '../../../../commons/adminTripTable';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Destination extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId);
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        icon="marker"
                        content={this.props.destination.name}
                        subContent="Manage destination"
                    />
                </div>
                <div className="ui segment">
                    <AdminTripTable
                        destinationId={parseInt(this.props.params.destinationId, 10)}
                        role={USER_ROLES.MODERATOR}
                    />
                </div>
            </div>
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
