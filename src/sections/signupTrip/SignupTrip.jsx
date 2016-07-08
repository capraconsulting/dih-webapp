import React from 'react';

import SignupTripFormContainer from './SignupTripFormContainer';


function SignupTrip() {
    return (
        <div className="ui segments">
            <div className="ui blue inverted segment header">
                <h2>Sign up for a trip</h2>
            </div>
            <div className="ui segment">
                <div className="ui grid">
                    <div className="eight wide column">
                        <SignupTripFormContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupTrip;
