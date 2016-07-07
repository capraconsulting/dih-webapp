import React, { PropTypes } from 'react';

function NewDestinationForm(props) {
    return (
        <form id="newDestinationForm" onSubmit={props.handleSubmit}>
            <h3>New destination</h3>
            <div className="ui action input">
                <input
                    type="text"
                    id="destinationName"
                    placeholder="Destination name"
                    value={props.destinationName}
                    onChange={props.handleChange}
                />
                <button id="submit" className="ui button primary" type="submit">Add</button>
            </div>
        </form>
    );
}

NewDestinationForm.propTypes = {
    destinationName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default NewDestinationForm;
