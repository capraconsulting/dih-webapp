import React from 'react';
import * as tripsApi from '../../api/trips';
import { tripStatusesForDropdown } from '../../helpers';
import Dropdown from '../../commons/Dropdown';


class TripStatusDropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            options: tripStatusesForDropdown()
        };
    }

    handleStatusChange(event) {
        this.props.trip.status = event.target.value;
        tripsApi.putTrip(this.props.trip);
    }

    render() {
        return (
            <Dropdown
                name=""
                selectedValue={this.props.trip.status}
                options={this.state.options}
                onChange={e => { this.handleStatusChange(e); }}
            />
        );
    }
}


TripStatusDropdown.propTypes = {
    trip: React.PropTypes.object.isRequired
};

export default TripStatusDropdown;
