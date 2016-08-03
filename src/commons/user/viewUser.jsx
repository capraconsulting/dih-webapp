import React, { PropTypes } from 'react';
import moment from 'moment';

import List from '../list';
import ListItem from '../list/listItem';
import FluidListItem from '../list/fluidListItem';

const renderIfAdmin = (props, element) => {
    if (props.showAdminFields) {
        return element;
    }
    return '';
};

const ViewUser = (props) => (
    <List>
        <ListItem
            name="First name"
            icon="user"
            content={props.user.firstname}
        />
        <ListItem
            name="Last name"
            icon="user"
            content={props.user.lastname}
        />
        <ListItem
            name="E-mail"
            icon="at"
            content={props.user.email}
        />
        {renderIfAdmin(props,
            <ListItem
                name="User role"
                icon="protect"
                content={props.user.role}
            />
        )}

        <ListItem
            name="Born"
            icon="birthday"
            content={moment(props.user.birth).fromNow()}
        />
        <ListItem
            name="Birthday"
            icon="birthday"
            content={moment(props.user.birth).calendar()}
        />

        {renderIfAdmin(props,
            <ListItem
                name="Created"
                icon="add user"
                content={moment(props.user.createdAt).calendar()}
            />
        )}
        {renderIfAdmin(props,
            <FluidListItem
                name="Notes"
                icon="info circle"
                content={props.user.notes}
            />
        )}


    </List>
);

ViewUser.propTypes = {
    user: PropTypes.object.isRequired,
    showAdminFields: PropTypes.bool
};


export default ViewUser;
