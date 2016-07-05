import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setPassword } from '../../actions/authenticationActions';
import { retrieve } from '../../actions/accountActions';
import ConfirmSignUpForm from './ConfirmSignUpForm';

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

class ConfirmSignUpFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve({ Authorization: `Bearer ${this.props.location.query.token}` });
    }

    handleSubmit(data) {
        this.handlers.update(data, { Authorization: `Bearer ${this.props.location.query.token}` })
            .then(() => {
                if (this.props.isAuthenticated) browserHistory.push('/');
            });
    }

    render() {
        return (
            <ConfirmSignUpForm
                account={this.props.account}
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

const mapStateToProps = store => ({
    account: store.accountState.account,
    isAuthenticated: store.authenticationState.isAuthenticated
});

ConfirmSignUpFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    account: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ConfirmSignUpFormContainer);
