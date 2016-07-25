import React, { PropTypes, Component } from 'react';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { create } from '../../actions/userActions';

const createHandlers = (dispatch) => (data) => dispatch(create(data));

class SignUpFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(data) {
        this.handlers(data);
    }

    render() {
        return (
            <SignUpForm
                errorMessage={this.props.errorMessage}
                successMessage={this.props.successMessage}
                isFetching={this.props.isFetching}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    successMessage: store.userState.successMessage,
    errorMessage: store.userState.errorMessage,
    isFetching: store.userState.isFetching
});

SignUpFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
};

export default connect(mapStateToProps)(SignUpFormContainer);
