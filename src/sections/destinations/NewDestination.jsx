import React from 'react';
import NewDestinationForm from './NewDestinationForm.jsx';


class NewDestination extends React.Component {
    render() {
        return (
            <div className="accordion-menu">
                <div className="accordion-header">Add new destination</div>
                <div className="accordion-content">
                    <NewDestinationForm />
                </div>
            </div>
        );
    }
}

export default NewDestination;
