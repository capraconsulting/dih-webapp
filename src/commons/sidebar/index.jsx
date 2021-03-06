import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../constants';
import { retrieve } from '../../actions/accountActions';
import { logout } from '../../actions/authenticationActions';
import Account from './Account';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarMenuGroup from './SidebarMenuGroup';
import './sidebar.scss';

const createHandlers = (dispatch) => ({
    logout() {
        return dispatch(logout());
    },
    getAccount() {
        return dispatch(retrieve());
    }
});

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.getAccount();
    }

    getClasses() {
        const classes = ['ui', 'sidebar', 'left', 'vertical', 'menu'];
        if (this.props.isMobile) {
            classes.push('isMobile');
            classes.splice(classes.indexOf('visible'), 0);
        } else {
            classes.splice(classes.indexOf('isMobile'), 0);
            classes.push('visible');
        }

        if (this.props.sidebarOpen && classes.indexOf('visible') < 0) {
            classes.push('visible');
        }
        return classes;
    }

    handleLogout() {
        this.handlers.logout();
    }

    render() {
        return (<div className={this.getClasses().join(' ')}>
            <div className="item brand">
                <a href="https://www.drapenihavet.no/en/home/">
                    <img src="/logo.png" alt="logo" />
                </a>
                Dråpen i Havet
            </div>

            <SidebarMenuItem uri="/profile" itemName="My profile" icon="child" />

            <SidebarMenuGroup groupName="Trips" icon="plane">
                <SidebarMenuItem uri="/trips" itemName="My trips" />
                <SidebarMenuItem uri="/trips/signup" itemName="Sign up for a trip" />
            </SidebarMenuGroup>

            {(this.props.account.role === USER_ROLES.MODERATOR ||
            this.props.account.role === USER_ROLES.ADMIN) &&
                <SidebarMenuGroup groupName="Coordinator" icon="comments">
                    <SidebarMenuItem uri="/coordinator/destinations" itemName="My destinations" />
                </SidebarMenuGroup>
            }

            {this.props.account.role === USER_ROLES.ADMIN &&
                <SidebarMenuGroup groupName="Admin" icon="user">
                    <SidebarMenuItem uri="/admin/users" itemName="Users" />
                    <SidebarMenuItem uri="/admin/destinations" itemName="Destinations" />
                    <SidebarMenuItem uri="/admin/trips" itemName="Trips" />
                    <SidebarMenuItem uri="/admin/message/recipients" itemName="Message" />
                </SidebarMenuGroup>
            }
            <Account account={this.props.account} onLogout={e => { this.handleLogout(e); }} />
        </div>);
    }
}

Sidebar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = store => ({
    account: store.accountState.account
});

export default connect(mapStateToProps)(Sidebar);
