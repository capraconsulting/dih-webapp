import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import Header from '../../commons/pageHeader';
import Table from '../../commons/table';
import { listForUser } from '../../actions/tripActions';

const createHandlers = (dispatch) => (userId) => dispatch(listForUser(userId));

class Trips extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            loaded: false
        };
    }

    // This is hack of sorts. Normally "componentDidMount() {this.handlers(...)}" will do the job,
    // but that won't work in this case. The reason is that when the component intitially mounts,
    // this.props.account is undefined. Since componentDidMount is only called once,
    // the content would never be displayed.
    componentWillReceiveProps(nextProps) {
        if (!this.state.loaded) {
            this.handlers(nextProps.account.id);
            this.setState({ loaded: true });
        }
    }

    normalizeTripObjectsForTable(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            cleanObjects.push({
                id: value.id,
                status: value.status,
                destinationName: value.destination.name,
                startDate: moment(value.wishStartDate).format('YYYY-MM-DD'),
                endDate: moment(value.wishEndDate).format('YYYY-MM-DD')
            });
        });
        return cleanObjects;
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        content="Trips"
                        subContent="List of all trips"
                        icon="plane"
                    />
                </div>
                <div className="ui blue segment">
                    <Table
                        columnNames={{
                            destinationName: 'Destination',
                            startDate: 'Start date',
                            endDate: 'End date',
                            status: 'Status'
                        }}
                        itemKey="id"
                        link={{
                            columnName: 'destinationName',
                            prefix: '/trips/'
                        }}
                        items={this.normalizeTripObjectsForTable(this.props.tripsForUser)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    tripsForUser: store.tripState.tripsForUser,
    account: store.accountState.account
});

Trips.propTypes = {
    tripsForUser: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Trips);
