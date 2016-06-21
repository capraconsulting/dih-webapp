import React from 'react';

import * as destinationsApi from '../../api/destinations';

class NewDestinationForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
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
            <form id="newDestinationForm" onSubmit={this.handleSubmit}>
                <label htmlFor="destinationName">Name of destination:</label>
                <input
                    type="text"
                    id="destinationName"
                    value={this.state.destinationName}
                    onChange={this.handleTextChange}
                />
                <button id="submit" type="submit">Add</button>
            </form>
        );
    }
}

export default NewDestinationForm;
