import React, { PropTypes } from 'react';

function SidebarMenuGroup(props) {
    return (
        <div className="item">
            {props.groupName}
            <div className="menu">
                {props.children}
            </div>
        </div>
    );
}

SidebarMenuGroup.propTypes = {
    children: PropTypes.node,
    groupName: PropTypes.string
};

export default SidebarMenuGroup;
