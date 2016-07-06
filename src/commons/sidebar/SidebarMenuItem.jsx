import React from 'react';
import { Link } from 'react-router';

const SidebarMenuItem = (props) => (
    <Link
        to={props.uri}
        activeClassName="item-active"
        className="item"
    >
        {props.itemName}
    </Link>
);


SidebarMenuItem.propTypes = {
    uri: React.PropTypes.string.isRequired,
    itemName: React.PropTypes.string.isRequired
};

export default SidebarMenuItem;
