import React from 'react';

function DestinationList(props) {
    return (
        <div>
            {props.destinations.map(destination => (
                <li key={destination.id}>{destination.name}</li>
            ))}
        </div>
    );
}

DestinationList.propTypes = {
    destinations: React.PropTypes.array.isRequired
};

export default DestinationList;
