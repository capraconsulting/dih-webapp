import React from 'react';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="vertical-menu">
                <a href="#" className="item item-active">My profile</a>
                <a href="#" className="item">My trips</a>
                <a href="#" className="item">Sign up for a trip</a>
                <a href="#" className="item">Donations</a>
                <a href="#" className="item">Messages</a>
            </div>
        </aside>
    );
}

export default Sidebar;
