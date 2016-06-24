import React from 'react';
import { connect } from 'react-redux';

import NewTripForm from './NewTripForm';
import * as tripsApi from '../../api/trips';
import * as destinationsApi from '../../api/destinations';


class NewTripFormContainer extends React.Component {
    componentDidMount() {
        destinationsApi.getDestinations();
    }
    handleSubmit(data) {
        tripsApi.postNewTrip(data);
    }

    render() {
        return (
            <NewTripForm
                destinations={this.props.destinations}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

NewTripFormContainer.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(NewTripFormContainer);
