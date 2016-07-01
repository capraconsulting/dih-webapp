import React from 'react';
import { connect } from 'react-redux';

import ConfirmSignUpForm from './ConfirmSignUpForm';

class ConfirmSignUpFormContainer extends React.Component {
    componentDidMount() {
        accountApi.getAccount(this.props.location.query.token);
    }

    handleSubmit(data) {
        accountApi.putAccount(this.props.location.query.token, data);
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
    account: store.accountState.account
});

ConfirmSignUpFormContainer.propTypes = {
    account: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ConfirmSignUpFormContainer);
