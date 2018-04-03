import React, { PropTypes } from 'react';
import List from '../../../../commons//list';
import Segment from '../../../../commons/Segment';
import ListItem from '../../../../commons/list/listItem';
import FluidListItem from '../../../../commons/list/fluidListItem';


const ViewAdminValue = (props) => (
    <Segment>
        <List>
            <ListItem
                name="Title of value"
                icon="edit"
                content={props.adminValue.title}
            />
            <FluidListItem
                name="Description of the value"
                icon="quote left"
                content={props.adminValue.description}
            />
            <FluidListItem
                name="Value, i.e. what the value is"
                icon="keyboard"
                content={props.adminValue.value}
            />
        </List>
    </Segment>
);

ViewAdminValue.propTypes = {
    adminValue: PropTypes.object.isRequired,
    showAdminFields: PropTypes.bool
};


export default ViewAdminValue;
