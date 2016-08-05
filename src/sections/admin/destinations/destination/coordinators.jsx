import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Table from '../../../../commons/table';
import { retrieve } from '../../../../actions/destinationActions';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Coordinators extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId);
    }

    normalizeCoordinatorObjectsForTable(items) {
        if (!items) return []; // Prevents a TypeError, don't touch, it works now!
        return items.map(value => (
            {
                id: value.id,
                firstname: value.firstname,
                lastname: value.lastname,
                startDate: value.destinationCoordinator.startDate ?
                    moment(value.destinationCoordinator.startDate).format('YYYY-MM-DD') : 'Not set',
                endDate: value.destinationCoordinator.endDate ?
                    moment(value.destinationCoordinator.endDate).format('YYYY-MM-DD') : 'Forever'
            }
        ));
    }

    render() {
        const dateFields = { from: 'startDate', to: 'endDate' };

        return (
            <Table
                search
                dateFields={dateFields}
                columnNames={{
                    firstname: 'First name',
                    lastname: 'Last name',
                    startDate: 'Active from',
                    endDate: 'Active to'
                }}
                itemKey="id"
                items={this.normalizeCoordinatorObjectsForTable(this.props.destination.users)}
            />
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination
});

Coordinators.propTypes = {
    destination: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Coordinators);
