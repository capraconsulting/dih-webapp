import React from 'react';

import Header from '../../../commons/pageHeader';
import AdminTripTable from '../../../commons/adminTripTable';

const Trips = () => (
    <div className="ui segments">
        <div className="ui segment">
            <Header
                icon="plane"
                content="Trip requests"
                subContent="Review trip requests from volunteers"
            />
        </div>
        <div className="ui segment">
            <AdminTripTable />
        </div>
    </div>
);

export default Trips;
