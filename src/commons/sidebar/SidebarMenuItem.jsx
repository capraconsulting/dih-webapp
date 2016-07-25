import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SidebarMenuItem = (props) => (
    <Link
        to={props.uri}
        activeClassName="item-active"
        className="item"
    >
        {props.itemName}
        <i className={`large icon ${props.icon}`}></i>
    </Link>
);


SidebarMenuItem.propTypes = {
    uri: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    icon: PropTypes.string
};

export default SidebarMenuItem;
