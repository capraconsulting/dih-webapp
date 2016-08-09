import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.css';
import '../styles/main.scss';
import Header from '../commons/header';
import Sidebar from '../commons/sidebar';
import Loader from '../commons/Loader';
import NotificationContainer from '../commons/NotificationContainer.jsx';

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            windowWidth: window.innerWidth,
            isMobile: window.innerWidth < 900,
            sidebarOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({
            windowWidth: window.innerWidth,
            isMobile: window.innerWidth < 900,
            sidebarOpen: false
        });
    }

    toggleSidebar(e) {
        e.preventDefault();
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }

    closeSidebar(e) {
        if (this.state.sidebarOpen) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ sidebarOpen: false });
        }
    }

    render() {
        const classes = ['overlay', 'main-content'];
        if (!this.state.isMobile) {
            classes.push('pusher');
            classes.splice(classes.indexOf('isMobile'), 0);
        } else {
            classes.splice(classes.indexOf('pusher'), 0);
            classes.push('isMobile');
        }

        return (
            <div>
                <div className="wrapper">
                    <Loader active={typeof this.props.account.id === 'undefined'} />
                    <Sidebar
                        isMobile={this.state.isMobile}
                        sidebarOpen={this.state.sidebarOpen}
                    />
                    <Header
                        onClick={(e) => this.closeSidebar(e)}
                        toggleSidebar={(e) => this.toggleSidebar(e)}
                        isMobile={this.state.isMobile}
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                    <div onClick={(e) => this.closeSidebar(e)} className={classes.join(' ')}>
                        {this.props.children}
                    </div>
                </div>
                <NotificationContainer props />
            </div>
        );
    }
}

MainLayout.propTypes = {
    account: PropTypes.object.isRequired,
    children: PropTypes.object,
    routes: PropTypes.array,
    params: PropTypes.object
};

const mapStateToProps = store => ({
    account: store.accountState.account
});

export default connect(mapStateToProps)(MainLayout);
