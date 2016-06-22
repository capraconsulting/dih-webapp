import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import * as destinationsApi from '../../api/destinations';

class NewTripForm extends React.Component {
    componentDidMount() {
        destinationsApi.getDestinations();
    }
    render() {
        return (
            <form id="newTripForm">
                <label htmlFor="tripName">Destination:</label>
                <select className="ui fluid dropdown" >
                    <option value="">Destinations</option>
                    {this.props.destinations.map(destination => (
                        <option key={destination.id}>{destination.name}</option>
                    ))}
                </select>
                <DatePicker
                    id="fromDate"
                    locale="en-gb"
                />

                <DatePicker
                    id="toDate"
                    locale="en-gb"
                />
                <button type="submit">Add</button>
            </form>
        );
    }
}


const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

NewTripForm.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(NewTripForm);
