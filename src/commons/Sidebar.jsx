import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="vertical-menu">
                <SidebarMenuItem uri="/profile" itemName="My profile" />
                <a href="#" className="item">My trips</a>
                <SidebarMenuItem uri="/trips/signup" itemName="Sign up for a trip" />
                <a href="#" className="item">Donations</a>
                <a href="#" className="item">Messages</a>
                <SidebarMenuItem uri="/admin/destinations" itemName="Admin Destinations" />
            </div>
        </aside>
    );
}

export default Sidebar;
