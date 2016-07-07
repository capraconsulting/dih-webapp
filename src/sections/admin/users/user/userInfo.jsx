import React, { PropTypes } from 'react';
import List from '../../../../commons/list';
import ListItem from '../../../../commons/list/listItem';
import FluidListItem from '../../../../commons/list/fluidListItem';
import moment from 'moment';

const userInfo = (props) => (
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
            name="email"
            icon="at"
            content={props.user.email}
        />
        <ListItem
            name="User role"
            icon="protect"
            content={props.user.role}
        />
        <ListItem
            name="Age"
            icon="birthday"
            content={moment(props.user.birth).fromNow()}
        />
        <ListItem
            name="Birthday"
            icon="birthday"
            content={moment(props.user.birth).calendar()}
        />
        <ListItem
            name="Created"
            icon="add user"
            content={moment(props.user.createdAt).calendar()}
        />
        <FluidListItem
            name="Notes"
            icon="info circle"
            content={props.user.notes}
        />
    </List>
);

userInfo.propTypes = {
    user: PropTypes.object
};


export default userInfo;
