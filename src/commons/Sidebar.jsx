import React from 'react';
import SidebarMenuItem from './SidebarMenuItem.jsx';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="vertical-menu">
                <SidebarMenuItem uri="/profile" itemName="My profile" />
                <SidebarMenuItem uri="/admin/destinations" itemName="Destinatons" />
                <a href="#" className="item">My trips</a>
                <a href="#" className="item">Sign up for a trip</a>
                <a href="#" className="item">Donations</a>
                <a href="#" className="item">Messages</a>
            </div>
        </aside>
    );
}

export default Sidebar;
