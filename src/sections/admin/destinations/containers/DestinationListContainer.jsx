import React from 'react';
import { connect } from 'react-redux';

import DestinationList from '../components/DestinationList';

class DestinationListContainer extends React.Component {

    componentDidMount() {
        destinationsApi.getDestinations();
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
    destinations: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationListContainer);
