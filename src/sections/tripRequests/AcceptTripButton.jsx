import React from 'react';

function AcceptTripButton(props) {
    return (
        <button onClick={props.handleClick} className="ui button">Approve</button>
    );
}

AcceptTripButton.propTypes = {
    handleClick: React.PropTypes.func.isRequired
};

export default AcceptTripButton;
