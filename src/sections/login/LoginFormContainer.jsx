import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { login } from '../../actions/authenticationActions';

const createHandlers = (dispatch) => (data) => dispatch(login(data));

class LoginFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(data) {
        this.handlers(data)
            .then(() => {
                if (this.props.isAuthenticated) browserHistory.push('/');
            });
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

LoginFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isFetching,
    errorMessage: PropTypes.string
};

const mapStateToProps = store => ({
    errorMessage: store.authenticationState.errorMessage,
    isAuthenticated: store.authenticationState.isAuthenticated,
    isFetching: store.authenticationState.isFetching
});

export default connect(mapStateToProps)(LoginFormContainer);
