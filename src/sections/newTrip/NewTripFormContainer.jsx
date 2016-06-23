import React from 'react';
import { connect } from 'react-redux';

import NewTripForm from './NewTripForm';
import * as destinationsApi from '../../api/destinations';

class NewTripFormContainer extends React.Component {
    componentDidMount() {
        destinationsApi.getDestinations();
    }
    handleSubmit(data) {
        console.log(data);
    }

    render() {
        return (
            <NewTripForm
                destinations={this.props.destinations}
                onSubmit={event => { this.handleSubmit(event); }}
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
