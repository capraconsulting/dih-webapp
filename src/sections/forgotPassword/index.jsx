import React, { PropTypes, Component } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { connect } from 'react-redux';
import { requestPasswordReset } from '../../actions/authenticationActions';

const createHandlers = (dispatch) => (data) => dispatch(requestPasswordReset(data));

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(data) {
        this.handlers(data);
    }

    render() {
        return (
            <ForgotPasswordForm
                successMessage={this.props.successMessage}
                errorMessage={this.props.errorMessage}
                isFetching={this.props.isFetching}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

ForgotPassword.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
};

const mapStateToProps = store => ({
    errorMessage: store.authenticationState.errorMessage,
    successMessage: store.authenticationState.successMessage,
    isAuthenticated: store.authenticationState.isAuthenticated,
    isFetching: store.authenticationState.isFetching
});

export default connect(mapStateToProps)(ForgotPassword);
