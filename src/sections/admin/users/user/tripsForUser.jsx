import React, { PropTypes } from 'react';

import AdminTripTable from '../../../../commons/adminTripTable';

const TripsForUser = props => (
    <AdminTripTable user={props.user} />
);

TripsForUser.propTypes = {
    user: PropTypes.object
};

export default TripsForUser;
