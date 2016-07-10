import React, { PropTypes, Component } from 'react';
import ConfirmForgotPasswordForm from './ConfirmForgotPasswordForm';
import { connect } from 'react-redux';
import { setPassword } from '../../../actions/authenticationActions';

const createHandlers = (dispatch) => (data, header) => dispatch(setPassword(data, header));

class ForgotPasswordConfirm extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(data) {
        this.handlers(data, { Authorization: `Bearer ${this.props.location.query.token}` });
    }

    render() {
        return (
            <ConfirmForgotPasswordForm
                errorMessage={this.props.errorMessage}
                isFetching={this.props.isFetching}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

ForgotPasswordConfirm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isFetching,
    location: PropTypes.object.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
};

const mapStateToProps = store => ({
    errorMessage: store.authenticationState.errorMessage,
    isAuthenticated: store.authenticationState.isAuthenticated,
    isFetching: store.authenticationState.isFetching
});

export default connect(mapStateToProps)(ForgotPasswordConfirm);
