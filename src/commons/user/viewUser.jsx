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
            name="Birthday"
            icon="birthday"
            content={props.user.birth ? `${moment(props.user.birth).calendar()}
            (${moment(props.user.birth).fromNow(true)} old)` : 'Not set'}
        />

        {renderIfAdmin(props,
            <ListItem
                name="Date account was created"
                icon="add user"
                content={moment(props.user.createdAt).calendar()}
            />
        )}
        <FluidListItem
            name="Occupation and experience"
            icon="student"
            content={props.user.volunteerInfo}
        />
        {renderIfAdmin(props,
            <ListItem
                name="Has the user confirmed that he/she has read the guidelines?"
                icon="book"
                content={props.user.readTerms ? 'Yes' : 'No'}
            />
        )}
        {renderIfAdmin(props,
            <FluidListItem
                name="Notes (only seen by administrators)"
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
