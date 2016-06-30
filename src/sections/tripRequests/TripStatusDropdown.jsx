import React from 'react';
import _ from 'lodash';
import * as tripsApi from '../../api/trips';
import { TRIP_STATUSES } from '../../constants';
import Dropdown from '../../commons/Dropdown';


class TripStatusDropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            options: []
        };
        _.forOwn(TRIP_STATUSES, status => {
            this.state.options.push({
                value: status,
                label: status
            });
        });
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
