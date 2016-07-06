import React from 'react';

import UpdateTripFormContainer from './UpdateTripFormContainer';

function UpdateTrip() {
    return (
        <div className="ui segments">
            <div className="ui blue inverted segment header">
                <h2>Update trip information</h2>
            </div>
            <div className="ui segment">
                <div className="ui grid">
                    <div className="eight wide column">
                        <UpdateTripFormContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateTrip;
