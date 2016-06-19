import React from 'react';

class NewDestinationForm extends React.Component {
    render() {
        return (<form id="newDestinationForm">
            <label for="destinationName">Name of destination:</label>
            <input type="text" id="destinationName" ref={input => { this._name = input; } } />
            <button onClick="{this._handleSubmit.bind(this)}" type="submit">Add</button>
            </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();
        // @TODO Push data to remote server
    }
}

export default NewDestinationForm;
