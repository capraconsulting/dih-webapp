import _ from 'lodash';
import { TRIP_STATUSES } from './constants';

export function tripStatusesForDropdown() {
    const options = [];
    _.forOwn(TRIP_STATUSES, status => {
        options.push({
            value: status,
            label: status[0].toUpperCase() + status.slice(1).toLowerCase()
        });
    });
    return options;
}
