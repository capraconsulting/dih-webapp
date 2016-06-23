import React from 'react';

import NewTripFormContainer from './NewTripFormContainer';


function NewTrip() {
    return (
        <div className="accordion-menu">
            <div className="accordion-header">Add new trip</div>
            <div className="accordion-content">
                <NewTripFormContainer />
            </div>
        </div>
    );
}

export default NewTrip;
