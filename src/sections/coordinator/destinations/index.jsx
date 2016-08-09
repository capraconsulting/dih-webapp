import React from 'react';

import Header from '../../../commons/pageHeader';
import DestinationsTable from './destinationsTable';

const CoordinatorDestinations = () => (
    <div className="ui segments">
        <div className="ui segment">
            <Header
                content="Destinations"
                subContent="View your destinations"
                icon="marker"
            />
        </div>
        <div className="ui segment">
            <DestinationsTable />
        </div>
    </div>
);

export default CoordinatorDestinations;
