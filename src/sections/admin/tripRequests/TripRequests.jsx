import React from 'react';
import { connect } from 'react-redux';
import TripRequestsTable from './components/TripRequestsTable';
import { list } from '../../../actions/tripActions';

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
            <TripRequestsTable trips={this.props.trips} />
        );
    }
}

const mapStateToProps = store => ({
    trips: store.tripState.trips
});

TripRequestsContainer.propTypes = {
    trips: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(TripRequestsContainer);
