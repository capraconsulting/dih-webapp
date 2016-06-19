import React from 'react';
import { Link } from 'react-router';

class SidebarMenuItem extends React.Component {
    render() {
        return (
            <Link
                to={this.props.uri}
                activeClassName="item-active"
                className="item"
            >
                {this.props.itemName}
            </Link>
        );
    }
}

SidebarMenuItem.propTypes = {
    uri: React.PropTypes.string,
    itemName: React.PropTypes.string
};

export default SidebarMenuItem;
