import React from 'react';

function DestinationList(props) {
    return (
        <div id="destinations">
            <h3>All destinations</h3>
            <ul>
                {props.destinations.map(destination => (
                    <li id="destination" key={destination.id}>{destination.name}</li>
                ))}
            </ul>
        </div>
    );
}

DestinationList.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default DestinationList;
