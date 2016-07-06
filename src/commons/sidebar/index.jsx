import React, { PropTypes } from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarMenuGroup from './SidebarMenuGroup';
import './sidebar.scss';

function Sidebar(props) {
    const classes = ['ui', 'sidebar', 'left', 'vertical', 'menu'];

    if (props.isMobile) {
        classes.push('isMobile');
        classes.splice(classes.indexOf('visible'), 0);
    } else {
        classes.splice(classes.indexOf('isMobile'), 0);
        classes.push('visible');
    }

    if (props.sidebarOpen && classes.indexOf('visible') < 0) {
        classes.push('visible');
    }

    return (
        <div className={classes.join(' ')}>
            <div className="item brand">
                <img src="/logo.png" alt="logo" />
                Dråpen i Havet
            </div>
            <SidebarMenuItem uri="/profile" itemName="My profile" />
            <SidebarMenuGroup groupName="Trips">
                <SidebarMenuItem uri="/trips" itemName="My trips" />
                <SidebarMenuItem uri="/trips/signup" itemName="Sign up for a trip" />
            </SidebarMenuGroup>
            <SidebarMenuGroup groupName="Admin">
                <SidebarMenuItem uri="/admin/users" itemName="Users" />
                <SidebarMenuItem uri="/admin/destinations" itemName="Destinations" />
                <SidebarMenuItem uri="/admin/trips" itemName="Trip Requests" />
            </SidebarMenuGroup>
        </div>
    );
}

Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool,
    isMobile: PropTypes.bool
};

export default Sidebar;
