import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Table from '../../../../commons/table';
import { listForDestination } from '../../../../actions/tripActions';

const createHandlers = (dispatch) => (id) => dispatch(listForDestination(id));

class Volunteers extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId);
    }

    normalizeTripObjectsForTable(items) {
        const cleanObjects = [];
        items.forEach(value => {
            cleanObjects.push({
                id: value.id,
                status: value.status,
                name: `${value.user.firstname} ${value.user.lastname} `,
                startDate: moment(value.startDate).format('YYYY-MM-DD'),
                endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD') : 'Not set'
            });
        });
        return cleanObjects;
    }

    render() {
        return (
            <Table
                columnNames={{
                    name: 'Name',
                    startDate: 'Start date',
                    endDate: 'End date',
                    status: 'Status'
                }}
                itemKey="id"
                link={{
                    columnName: 'name',
                    prefix: '/admin/users/'
                }}
                items={this.normalizeTripObjectsForTable(this.props.tripsForDestination)}
            />
        );
    }
}

const mapStateToProps = store => ({
    tripsForDestination: store.tripState.tripsForDestination
});

Volunteers.propTypes = {
    tripsForDestination: React.PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Volunteers);
