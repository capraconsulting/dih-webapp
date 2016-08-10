import React, { PropTypes, Component } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { login } from '../../actions/authenticationActions';

const createHandlers = (dispatch) => (data) => dispatch(login(data));

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(data) {
        this.handlers(data);
    }

    render() {
        return (
            <LoginForm
                errorMessage={this.props.errorMessage}
                isFetching={this.props.isFetching}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    errorMessage: store.authenticationState.errorMessage,
    isFetching: store.authenticationState.isFetching
});

LoginFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

export default connect(mapStateToProps)(LoginFormContainer);
