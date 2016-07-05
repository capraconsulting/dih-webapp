import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DestinationInfo from '../components/DestinationInfo';


class DestinationInfoContainer extends React.Component {

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
        if (this.findDestination(this.props.destinations, this.props.destinationId) === false) {
            browserHistory.push('NotFound');
            return null;
        }
        return (
            <DestinationInfo
                destination={
                    this.findDestination(this.props.destinations, this.props.destinationId)
                }
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationInfoContainer.propTypes = {
    destinations: React.PropTypes.array.isRequired,
    destinationId: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(DestinationInfoContainer);
