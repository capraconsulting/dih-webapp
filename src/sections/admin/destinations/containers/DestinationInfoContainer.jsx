import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { list } from '../../../../actions/destinationActions';
import { browserHistory } from 'react-router';

import DestinationInfo from '../components/DestinationInfo';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationInfoContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentWillMount() {
        this.handlers();
    }

    findDestination(destinations, destinationId) {
        const id = parseInt(destinationId, 10);
        for (const destination of destinations) {
            if (destination.id === id) {
                return destination;
            }
        }
        return false;
    }

    render() {
        console.log(this.props.destinations);
        const foundDestination = this.findDestination(this.props.destinations
        , this.props.destinationId);
        if (foundDestination === false) {
            // browserHistory.push('NotFound');
            console.log('fuck');
            return null;
        }
        return (
            <DestinationInfo
                destination={
                    foundDestination
                }
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationInfoContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: React.PropTypes.array.isRequired,
    destinationId: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(DestinationInfoContainer);
