import React, { PropTypes, Component } from 'react';
import Table from '../../../../commons/Table';

const emails = [
    {
        id: 1,
        name: 'A name 1',
        description: 'a description belonging to 1'
    },
    {
        id: 2,
        name: 'A name 2',
        description: 'a description belonging to 2'
    },
    {
        id: 3,
        name: 'A name 3',
        description: 'a description belonging to 3'
    },
    {
        id: 4,
        name: 'A name 4',
        description: 'a description belonging to 4'
    }
];

class EmailTemplates extends Component {
    render() {
        return (
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
                items={emails}
            />
        );
    }
}

EmailTemplates.propTypes = {
    destinationId: PropTypes.number.isRequired
};

export default EmailTemplates;
