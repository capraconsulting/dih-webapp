import React from 'react';

import DestinationListContainer from './DestinationListContainer';
import NewDestinationFormContainer from './NewDestinationFormContainer';

function Destinations() {
    return (
        <div className="ui segments">
            <div className="ui blue inverted segment header">
                <h2>Destinations</h2>
            </div>
            <div className="ui segment">
                <div className="ui grid">
                    <div className="eight wide column">
                        <NewDestinationFormContainer />
                    </div>
                    <div className="sixteen wide column">
                        <DestinationListContainer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Destinations;
