import React from 'react';

import NewTripForm from './NewTripForm';


function NewTrip() {
    return (
        <div className="accordion-menu">
            <div className="accordion-header">Add new trip</div>
            <div className="accordion-content">
                <NewTripForm />
            </div>
        </div>
    );
}

export default NewTrip;
