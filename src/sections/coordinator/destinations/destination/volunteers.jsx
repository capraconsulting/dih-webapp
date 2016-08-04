import React, { PropTypes } from 'react';

import { USER_ROLES } from '../../../../constants';
import AdminTripTable from '../../../../commons/adminTripTable';


const Volunteers = (props) => (
    <AdminTripTable
        destinationId={parseInt(props.params.destinationId, 10)}
        role={USER_ROLES.MODERATOR}
    />
);

Volunteers.propTypes = {
    params: PropTypes.object
};

export default Volunteers;
