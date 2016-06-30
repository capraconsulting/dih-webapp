import React from 'react';
import { Link } from 'react-router';

function DestinationList(props) {
    return (
        <div id="destinations">
            <h3>All destinations</h3>
            <ul>
                {props.destinations.map(destination => (
                    <li
                        id="destination"
                        key={destination.id}
                    >
                        <Link to={`/admin/destinations/${destination.id}`}>
                            {destination.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

DestinationList.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default DestinationList;
