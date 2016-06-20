import React from 'react';
import { Link } from 'react-router';

function SidebarMenuItem(props) {
    return (
        <Link
            to={props.uri}
            activeClassName="item-active"
            className="item"
        >
            {props.itemName}
        </Link>
    );
}

SidebarMenuItem.propTypes = {
    uri: React.PropTypes.string,
    itemName: React.PropTypes.string
};

export default SidebarMenuItem;
