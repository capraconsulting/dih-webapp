import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { update, list } from '../../actions/tripActions';
import Dropdown from '../Dropdown';
import { tripStatusesForDropdown } from '../../helpers';

const createHandlers = (dispatch) => (
    {
        update(data) {
            return dispatch(update(data));
        },
        list() {
            return dispatch(list());
        }
    }
);

class TripStatusDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            options: tripStatusesForDropdown()
        };
    }

    handleStatusChange(event) {
        this.props.trip.status = event.target.value;
        this.handlers.update(this.props.trip)
            .then(() => this.handlers.list());
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
    dispatch: PropTypes.func.isRequired,
    trip: PropTypes.object.isRequired
};

export default connect()(TripStatusDropdown);
