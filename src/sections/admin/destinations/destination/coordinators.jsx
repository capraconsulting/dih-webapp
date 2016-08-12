import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CoordinatorForm from './coordinatorForm';
import Segment from '../../../../commons/Segment';
import Table from '../../../../commons/table';

import { retrieve, update } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

import { BOOLEAN_LABELS } from '../../../../constants';

const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(destination) {
            return dispatch(update(destination));
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class Coordinators extends Component {
    constructor(props) {
        super(props);
        this.dateFields = { from: 'startDate', to: 'endDate' };
        this.state = {
            active: false,
            loading: false
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.destinationId)
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
                    moment(value.destinationCoordinator.endDate).format('YYYY-MM-DD') : 'Forever',
                isActive: value.destinationCoordinator.isActive
            }
        ));
    }

    handleSubmit(data) {
        const user = data;
        user.userId = parseInt(user.userId, 10);

        if (!user.endDate) user.endDate = null;

        const payload = {
            users: [user],
            id: this.props.destination.id
        };

        this.handlers.update(payload)
        .then(response => {
            const message = 'Coordinator added';
            const { error } = response;
            if (!error) {
                this.handlers.notification(message, 'success');
            }
        })
        .then(() => {
            this.handlers.retrieve(this.props.params.destinationId);
        });
    }

    render() {
        return (
            <Segment loading={this.state.loading}>
                <CoordinatorForm
                    destination={this.props.destination}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
                <Table
                    search
                    dateFields={this.dateFields}
                    columnNames={{
                        fullName: 'Name',
                        phoneNumber: 'Phone number',
                        startDate: 'Active from',
                        endDate: 'Active to',
                        isActive: 'Status'
                    }}
                    responsivePriority={[
                        'fullName',
                        'phoneNumber',
                        'startDate',
                        'endDate'
                    ]}
                    itemKey="id"
                    items={this.normalizeCoordinatorObjectsForTable(this.props.destination.users)}
                    labels={{ isActive: BOOLEAN_LABELS }}
                    responsivePriority={[
                        'fullName',
                        'phoneNumber',
                        'isActive',
                        'endDate',
                        'startDate'
                    ]}
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
