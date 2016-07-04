import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { list } from '../../actions/tripActions';
import TripRequests from './TripRequests';

const createHandlers = (dispatch) => () => dispatch(list());

class TripRequestsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        return (
            <TripRequests trips={this.props.trips} />
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

TripRequestsContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    trips: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TripRequestsContainer);
