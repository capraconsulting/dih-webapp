import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AddVolunteerForm from './addVolunteerForm';
import { list } from '../../../../actions/userActions';

const createHandlers = (dispatch) => dispatch(list());

class AddVolunteerFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        console.log(this.props.users);
        return (
            <div>
                <h4>Add volunteer to destination</h4>
                <AddVolunteerForm
                    users={this.props.users}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

AddVolunteerFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AddVolunteerFormContainer);
