import React from 'react';

class NewDestinationForm extends React.Component {
    render() {
        return (<form id="newDestinationForm">
            <label for="destinationName">Name of destination:</label>
            <input type="text" id="destinationName" />
            <button type="submit">Add</button>
            </form>
        );
    }
}

export default NewDestinationForm;
