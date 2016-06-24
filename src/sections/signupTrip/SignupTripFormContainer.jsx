import React from 'react';
import { connect } from 'react-redux';

import SignupTripForm from './SignupTripForm';
import * as tripsApi from '../../api/trips';
import * as destinationsApi from '../../api/destinations';


class SignupTripFormContainer extends React.Component {
    componentDidMount() {
        destinationsApi.getDestinations();
    }
    handleSubmit(data) {
        tripsApi.postTrip(data);
    }

    render() {
        return (
            <SignupTripForm
                destinations={this.props.destinations}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

SignupTripFormContainer.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(SignupTripFormContainer);
