import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Segment from '../../../../commons/Segment';
import Table from '../../../../commons/table';
import { retrieve } from '../../../../actions/destinationActions';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Coordinators extends Component {
    constructor(props) {
        super(props);
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.state = {
            loading: false
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId)
            .then(() => {
                this.setState({ loading: false });
            });
    }

    normalizeCoordinatorObjectsForTable(items) {
        return items.map(value => (
            {
                id: value.id,
                fullName: value.fullName,
                phoneNumber: value.phoneNumber,
                startDate: value.destinationCoordinator.startDate ?
                    moment(value.destinationCoordinator.startDate).format('YYYY-MM-DD') : 'Not set',
                endDate: value.destinationCoordinator.endDate ?
                    moment(value.destinationCoordinator.endDate).format('YYYY-MM-DD') : 'Forever'
            }
        ));
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <Table
                    search
                    dateFields={this.dateFields}
                    columnNames={{
                        fullName: 'Name',
                        phoneNumber: 'Phone number',
                        startDate: 'Active from',
                        endDate: 'Active to'
                    }}
                    itemKey="id"
                    items={this.normalizeCoordinatorObjectsForTable(this.props.destination.users)}
                />
            </Segment>
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
