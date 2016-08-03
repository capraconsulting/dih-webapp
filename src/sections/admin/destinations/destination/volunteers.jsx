import React, { PropTypes } from 'react';

import AdminTripTable from '../../../../commons/adminTripTable';

const Volunteers = (props) => (
    <AdminTripTable destinationId={parseInt(props.params.destinationId, 10)} />
);

Volunteers.propTypes = {
    params: PropTypes.object.isRequired
};

export default Volunteers;
