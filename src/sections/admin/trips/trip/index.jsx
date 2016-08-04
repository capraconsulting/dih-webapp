import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../../../../commons/pageHeader';
import { retrieve } from '../../../../actions/tripActions';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Trip extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.tripId);
    }

    render() {
        console.log(this.props.trip);
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        icon="plane"
                        content="Trip to [Destination name]"
                        subContent="Manage trip"
                    />
                </div>
                <div className="ui segment">
                </div>
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
    trip: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trip);
