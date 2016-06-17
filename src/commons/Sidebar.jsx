import React from 'react';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
            </div>
            <div className="vertical-menu">
                <a className="item item-active">My profile</a>
                <a className="item">My trips</a>
                <a className="item">Sign up for a trip</a>
                <a className="item">Donations</a>
                <a className="item">Messages</a>
            </div>
        </aside>
    );
}

export default Sidebar;
