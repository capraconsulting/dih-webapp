import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AddVolunteerForm from './addVolunteerForm';
import { create } from '../../../../actions/tripActions';
import { list } from '../../../../actions/userActions';

const createHandlers = (dispatch) => (
    {
        create(data) {
            return dispatch(create(data));
        },
        list() {
            return dispatch(list());
        }
    }
);

class AddVolunteerFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.list();
    }

    handleSubmit(data) {
        const alteredData = {
            ...data,
            startDate: data.wishStartDate,
            endDate: data.wishEndDate,
            destinationId: this.props.destinationId,
            status: 'ACCEPTED'
        };
        this.handlers.create(alteredData);
    }

    render() {
        return (
            <div>
                <h4>Add volunteer to destination</h4>
                <AddVolunteerForm
                    users={this.props.users}
                    onSubmit={e => { this.handleSubmit(e); }}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

AddVolunteerFormContainer.propTypes = {
    destinationId: React.PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AddVolunteerFormContainer);
