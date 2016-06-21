import React from 'react';

function DestinationList(props) {
    return (
        <div id="destinationsList">
            {props.destinations.map(destination => (
                <li id="destination" key={destination.id}>{destination.name}</li>
            ))}
        </div>
    );
}

DestinationList.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default DestinationList;
