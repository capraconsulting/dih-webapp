import React, { PropTypes } from 'react';

import AdminTripTable from '../../../../commons/adminTripTable';

const TripsForUser = props => (
    <AdminTripTable userId={props.user.id} />
);

TripsForUser.propTypes = {
    user: PropTypes.object
};

export default TripsForUser;
