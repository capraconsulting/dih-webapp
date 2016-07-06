import React from 'react';
import UpdateTripForm from './UpdateTripForm';

class UpdateTripFormContainer extends React.Component {
    handleSubmit(data) {
        console.log(data);
    }

    render() {
        return (
            <UpdateTripForm
                onSubmit={e => { this.handleSubmit(e); }}
            />
        );
    }
}

export default UpdateTripFormContainer;
