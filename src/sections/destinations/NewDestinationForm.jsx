import React from 'react';

import * as destinationsApi from '../../api/destinations';

class NewDestinationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            destinationName: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const newDestinatioName = this.state.destinationName;
        if (!newDestinatioName) {
            return;
        }
        destinationsApi.postDestination({ name: this.state.destinationName });
        this.setState({
            destinationName: ''
        });
    }

    handleTextChange(e) {
        this.setState({
            destinationName: e.target.value
        });
    }

    render() {
        return (
            <form id="newDestinationForm" onSubmit={event => { this.handleSubmit(event); }}>
                <label htmlFor="destinationName">Name of destination:</label>
                <input
                    type="text"
                    id="destinationName"
                    value={this.state.destinationName}
                    onChange={event => { this.handleTextChange(event); }}
                />
                <button type="submit">Add</button>
            </form>
        );
    }
}

export default NewDestinationForm;
