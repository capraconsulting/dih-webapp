import React, { PropTypes } from 'react';
import List from '../../../../commons//list';
import Segment from '../../../../commons/Segment';
import ListItem from '../../../../commons/list/listItem';
import FluidListItem from '../../../../commons/list/fluidListItem';


const ViewAdminValue = (props) => (
    <Segment>
        <List>
            <ListItem
                name="First name"
                icon="user"
                content={props.adminValue.title}
            />
            <ListItem
                name="Last name"
                icon="user"
                content={props.adminValue.value}
            />
            <FluidListItem
                name="Work and experience"
                icon="building outline"
                content={props.adminValue.description}
            />
        </List>
    </Segment>
);

ViewAdminValue.propTypes = {
    adminValue: PropTypes.object.isRequired,
    showAdminFields: PropTypes.bool
};


export default ViewAdminValue;
