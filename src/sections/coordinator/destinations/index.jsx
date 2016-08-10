import React from 'react';

import Header from '../../../commons/pageHeader';
import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import DestinationsTable from './destinationsTable';

const CoordinatorDestinations = () => (
    <Segments>
        <Segment>
            <Header
                content="Destinations"
                subContent="View your destinations"
                icon="marker"
            />
        </Segment>
        <DestinationsTable />
    </Segments>
);

export default CoordinatorDestinations;
