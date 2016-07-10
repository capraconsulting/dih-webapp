import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { list } from '../../../../actions/destinationActions';
import NotFound from '../../../../commons/NotFound';
import Dropdown from '../../../../commons/Dropdown';
import { TRIP_STATUSES } from '../../../../constants';
import VolunteersAtDestinationContainer from './volunteersAtDestinationContainer';
import { tripStatusesForDropdown } from '../../../../helpers';
import DestinationInfo from './destinationInfo';
import AddVolunteerFormContainer from './addVolunteerFormContainer';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            selectedStatus: TRIP_STATUSES.ACTIVE
        };
    }

    componentDidMount() {
        this.handlers();
    }


    findDestination(destinations, destinationId) {
        const id = parseInt(destinationId, 10);
        for (const destination of destinations) {
            if (destination.id === id) {
                return destination;
            }
        }
        return false;
    }

    selectedStatusIsChanged(e) {
        this.setState({
            selectedStatus: e.target.value
        });
    }

    render() {
        const foundDestination = this.findDestination(this.props.destinations
        , this.props.params.destinationId);
        if (foundDestination === false) {
            return <NotFound />;
        }
        return (
            <div className="ui segments">
                <DestinationInfo
                    destination={
                        foundDestination
                    }
                />
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
                                <AddVolunteerFormContainer />
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


const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: React.PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(DestinationContainer);
