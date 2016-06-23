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
                <h3>New destination</h3>
                <div className="ui action input">
                    <input
                        type="text"
                        id="destinationName"
                        placeholder="Destination name"
                        value={this.state.destinationName}
                        onChange={event => { this.handleTextChange(event); }}
                    />
                    <button className="ui button primary" type="submit">Add</button>
                </div>
            </form>
        );
    }
}

export default NewDestinationForm;
