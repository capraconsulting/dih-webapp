import React from 'react';
import Dropdown from '../../../commons/Dropdown';
import { TRIP_STATUSES } from '../../../constants';
import { tripStatusesForDropdown } from '../../../helpers';
import VolunteersAtDestinationContainer from './containers/VolunteersAtDestinationContainer';

class Destination extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedStatus: TRIP_STATUSES.CLOSED
        };
    }

    selectedStatusIsChanged(e) {
        this.setState({
            selectedStatus: e.target.value
        });
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui blue inverted segment header">
                    <h2>View destination</h2> {/* @TODO Get destination info from API */}
                    <bold>Name:</bold> {this.props.params.destinationId}
                </div>
                <div className="ui segment">
                    <div className="ui grid">
                        <div className="sixteen wide column">
                            <div className="eight column">
                                <h3>Active volunteers at this destination</h3>
                            </div>
                            <div className="eight column">
                                <Dropdown
                                    name="Select status"
                                    options={tripStatusesForDropdown()}
                                    selectedValue={this.state.selectedStatus}
                                    onChange={e => { this.selectedStatusIsChanged(e); }}
                                />
                            </div>
                        </div>
                        <div className="sixteen wide column">
                            <VolunteersAtDestinationContainer
                                destinationId={this.props.params.destinationId}
                                status={this.state.selectedStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
Destination.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default Destination;
