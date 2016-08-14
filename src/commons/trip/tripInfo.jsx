import React, { PropTypes } from 'react';
import moment from 'moment';

import { TRAVEL_METHODS, TRIP_STATUS_LABELS, TRIP_STATUSES } from '../../constants';
import List from '../list';
import Segment from '../Segment';
import ListItem from '../list/listItem';
import FluidListItem from '../list/fluidListItem';

const MOMENT_FORMAT = 'YYYY-MM-DD';

const TripInfo = (props) => (
    <Segment>
        <List>
            <ListItem
                name="Status"
                icon="circle"
                content={TRIP_STATUS_LABELS[props.trip.status]}
            />
            <FluidListItem
                name="Comment on status"
                icon="tag"
                content={props.trip.statusComment}
            />
            <ListItem
                name="Start date"
                icon="calendar"
                content={props.trip.startDate ?
                    moment(props.trip.startDate).format(MOMENT_FORMAT) : 'Not set'}
            />
            <ListItem
                name="End date"
                icon="calendar"
                content={props.trip.endDate ?
                    moment(props.trip.endDate).format(MOMENT_FORMAT) : 'Not set'}
            />
            <ListItem
                name="Date the volunteer arrived at the destination"
                hidden={props.trip.status !== TRIP_STATUSES.PRESENT &&
                props.trip.status !== TRIP_STATUSES.LEFT}
                icon="calendar"
                content={moment(props.trip.dateArrived).format(MOMENT_FORMAT)}
            />
            <ListItem
                name="Date the volunteer left the destination"
                hidden={props.trip.status !== TRIP_STATUSES.LEFT}
                icon="calendar"
                content={moment(props.trip.dateLeft).format(MOMENT_FORMAT)}
            />
            <ListItem
                name="Method of travel"
                icon="map"
                content={props.trip.travelMethod}
            />
            <ListItem
                name="Aiport the flight departs from"
                icon="marker"
                content={props.trip.departureAirport}
                hidden={props.trip.travelMethod !== TRAVEL_METHODS.PLANE}
            />
            <ListItem
                name="Flight number"
                icon="plane"
                content={props.trip.flightNumber}
                hidden={props.trip.travelMethod !== TRAVEL_METHODS.PLANE}
            />
            <FluidListItem
                name="Travel information"
                icon="train"
                content={props.trip.otherTravelInformation}
                hidden={props.trip.travelMethod !== TRAVEL_METHODS.OTHER}
            />
            <ListItem
                name="Hotel"
                icon="hotel"
                content={props.trip.hotel}
            />
            <FluidListItem
                name="Additional information"
                icon="info circle"
                content={props.trip.notes}
            />
        </List>
    </Segment>
);

TripInfo.propTypes = {
    trip: PropTypes.object
};

export default TripInfo;
