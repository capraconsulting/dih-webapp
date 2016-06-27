import React from 'react';

import * as tripsApi from '../../api/trips';
import AcceptTripButton from './AcceptTripButton';

class AcceptTripButtonContainer extends React.Component {
    handleClick() {
        tripsApi.setTripStatus(this.props.tripId);
    }

    render() {
        return (
            <AcceptTripButton handleClick={e => { this.handleClick(e); }} />
        );
    }
}


AcceptTripButtonContainer.propTypes = {
    tripId: React.PropTypes.number.isRequired
};

export default AcceptTripButtonContainer;
