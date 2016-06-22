import React from 'react';

import DestinationListContainer from './DestinationListContainer';
import NewDestinationForm from './NewDestinationForm';

function Destinations() {
    return (
        <div className="accordion-menu">
            <div className="accordion-header">Add new destination</div>
            <div className="accordion-content">
                <NewDestinationForm />
            </div>

            <div className="accordion-header">Destinations</div>
            <div className="accordion-content">
                <DestinationListContainer />
            </div>
        </div>
    );
}

export default Destinations;
