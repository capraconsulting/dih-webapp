import React, { PropTypes } from 'react';

import Dropdown from '../../../../commons/Dropdown';
import { TRIP_STATUSES } from '../../../../constants';
import VolunteersList from './volunteersList';
import { tripStatusesForDropdown } from '../../../../helpers';

class Volunteers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: TRIP_STATUSES.ACTIVE
        };
    }

    handleChange(e) {
        this.setState({
            selectedStatus: e.target.value
        });
    }

    render() {
        return (
            <div className="ui segment">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h3>Active volunteers at this destination</h3>
                        <Dropdown
                            name="Select status"
                            options={tripStatusesForDropdown()}
                            selectedValue={this.state.selectedStatus}
                            onChange={e => { this.handleChange(e); }}
                        />
                    </div>
                    <div className="sixteen wide column">
                        <VolunteersList
                            destinationId={this.props.destinationId}
                            status={this.state.selectedStatus}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Volunteers.propTypes = {
    destinationId: PropTypes.number.isRequired
};

export default Volunteers;
