import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Table from '../../../../commons/table';
import Segment from '../../../../commons/Segment';

const createTemplatesList = (destination) => {
    if (!destination.id) return [];
    return [
        {
            id: destination.acceptedStatusMailTemplateId,
            name: 'Accepted email',
            description: 'Email sent for users approved a trip.'
        },
        {
            id: destination.pendingStatusMailTemplateId,
            name: 'Pending email',
            description: 'Email sent for users pending approval for a trip.'
        },
        {
            id: destination.rejectedStatusMailTemplateId,
            name: 'Rejected email',
            description: 'Email sent for users rejected for a trip.'
        },
        {
          id: destination.leftStatusMailTemplateId,
          name: 'Left email',
          description: 'Email sent for users that have left a destination'
        }
    ];
};

const EmailTemplates = (props) => (
    <Segment>
        <Table
            columnNames={{
                name: 'Name',
                description: 'Description'
            }}
            link={{
                columnName: 'name',
                prefix: '/admin/email/'
            }}
            itemKey="id"
            items={createTemplatesList(props.destination)}
        />
    </Segment>
);

const mapStateToProps = store => ({
    destination: store.destinationState.destination
});

EmailTemplates.propTypes = {
    destination: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EmailTemplates);
