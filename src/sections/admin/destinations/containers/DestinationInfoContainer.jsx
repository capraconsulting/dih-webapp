import React from 'react';
import { connect } from 'react-redux';

import DestinationInfo from '../components/DestinationInfo';

import * as destinationsApi from '../../../../api/destinations';

class DestinationInfoContainer extends React.Component {

    componentDidMount() {
        destinationsApi.getDestinations();
    }

    findDestination(destinations, destinationId) {
        const id = parseInt(destinationId, 10);
        for (const destination of destinations) {
            if (destination.id === id) {
                return destination;
            }
        }
        return { name: 'failure' }; // @:TODO add notification to user that not valid destination
    }

    render() {
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
