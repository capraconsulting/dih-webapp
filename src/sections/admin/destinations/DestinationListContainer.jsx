import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { list } from '../../../actions/destinationActions';
import DestinationList from './DestinationList';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        return (
            <DestinationList destinations={this.props.destinations} />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationListContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationListContainer);
