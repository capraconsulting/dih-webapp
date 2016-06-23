import React from 'react';
import { connect } from 'react-redux';

import NewTripForm from './NewTripForm';
import * as destinationsApi from '../../api/destinations';

class NewTripFormContainer extends React.Component {
    componentDidMount() {
        destinationsApi.getDestinations();
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("herp derp");
    }

    render() {
        return (
            <NewTripForm
                destinations={this.props.destinations}
                onSubmit={this.handleSubmit.bind(this)}
                hei="hikk"
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
