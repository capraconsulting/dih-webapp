import React from 'react';

function DestinationInfo(props) {
    return (
        <div className="destination">
            <div className="ui blue inverted segment header">
                <h2>View destination</h2>
                <bold>Name:</bold> {props.destination.name}
            </div>
        </div>
    );
}

DestinationInfo.propTypes = {
    destination: React.PropTypes.object.isRequired
};

export default DestinationInfo;
