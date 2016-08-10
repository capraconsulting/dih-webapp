import React, { PropTypes, Component } from 'react';
import ConfirmSignUpForm from './ConfirmSignUpForm';
import { connect } from 'react-redux';
import { setPassword } from '../../../actions/authenticationActions';
import { retrieve } from '../../../actions/accountActions';

const createHandlers = (dispatch) => (
    {
        retrieve(token) {
            return dispatch(retrieve(token));
        },
        update(token, data) {
            return dispatch(setPassword(token, data));
        }
    }
);

class ConfirmSignUpFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve({ Authorization: `Bearer ${this.props.location.query.token}` });
    }

    handleSubmit(data) {
        this.handlers.update(data, { Authorization: `Bearer ${this.props.location.query.token}` });
    }

    render() {
        return (
            <ConfirmSignUpForm
                account={this.props.account}
                errorMessage={this.props.errorMessage}
                isFetching={this.props.isFetching}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    account: store.accountState.account,
    isFetching: store.authenticationState.isAuthenticated,
    errorMessage: store.authenticationState.errorMessage
});

ConfirmSignUpFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    location: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ConfirmSignUpFormContainer);
