import React from 'react';

import ConfirmSignUpForm from './ConfirmSignUpForm';

class ConfirmSignUpFormContainer extends React.Component {
    handleSubmit(data) { // eslint-disable-line
        // TODO Connect with API call from the future
    }

    render() {
        return (
            <ConfirmSignUpForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

export default ConfirmSignUpFormContainer;
