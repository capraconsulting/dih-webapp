import React from 'react';
import AdminTripTable from '../../../commons/adminTripTable';
import { TRIP_STATUSES } from '../../../constants';

const TripRequests = () => (<AdminTripTable statuses={[TRIP_STATUSES.PENDING]} />);

export default TripRequests;
