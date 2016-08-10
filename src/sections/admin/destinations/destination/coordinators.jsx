import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Segment from '../../../../commons/Segment';
import Table from '../../../../commons/table';
import { retrieve, update } from '../../../../actions/destinationActions';
import { pushNotification } from '../../../../actions/notificationActions';

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
            loading: false
        };
        this.actions = [
            {
                action: this.handleClick = this.handleClick.bind(this)
            }
        ];
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

    handleClick(data) {
        const user = data;

        user.userId = parseInt(user.id, 10);

        if (user.isActive) {
            user.endDate = moment();
            if (user.startDate > user.endDate) user.startDate = moment().subtract(1, 'days');
        } else {
            user.endDate = null;
            if (user.startDate > moment()) user.startDate = moment();
        }

        const payload = {
            users: [user],
            id: this.props.params.destinationId
        };

        this.handlers.update(payload)
        .then(response => {
            const message = 'Coordinator has been marked as inactive';
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
                    itemKey="id"
                    items={this.normalizeCoordinatorObjectsForTable(this.props.destination.users)}
                    labels={{
                        isActive: {
                            true: {
                                html: (
                                    <div className="ui green label">
                                        <i className="checkmark icon"></i>
                                        Active
                                    </div>
                                ),
                                action: this.handleClick
                            },
                            false: {
                                html: (
                                    <div className="ui red label">
                                        <i className="remove icon"></i>
                                        Inactive
                                    </div>
                                ),
                                action: this.handleClick
                            }
                        }
                    }}
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
