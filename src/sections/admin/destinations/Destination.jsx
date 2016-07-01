import React from 'react';
import Table from '../../../commons/Table';
import DestinationInfoContainer from './containers/DestinationInfoContainer';

function Destination(props) {
    return (
        <div className="ui segments">
            <DestinationInfoContainer destinationId={props.params.destinationId} />
            <div className="ui segment">
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <h3>Active volunteers at this destination</h3>
                        {/* @TODO get active volunteers on destination from API*/}
                        <Table
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
