import React from 'react';
import Table from '../../../commons/Table';

function Destination(props) {
    return (
        <div className="ui segments">
            <div className="ui blue inverted segment header">
                <h2>View destination</h2> {/* @TODO Get destination info from API */}
                <div id="destinationInfo">
                    <bold>Name:</bold> {props.params.destinationId}
                </div>
            </div>
            <div className="ui segment">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h3>Active volunteers at this destination</h3>
                        {/* @TODO get active volunteers on destination from API*/}
                        <Table
                            id="tripsTable"
                            columnNames={{ name: 'Name', age: 'Age' }}
                            items={[{ id: 1, name: 'Olav', age: 22 },
                            { id: 2, name: 'Ola Nordmann', age: 18 }]}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}
Destination.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default Destination;
