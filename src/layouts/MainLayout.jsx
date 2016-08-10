import React, { PropTypes } from 'react';

import 'normalize.css/normalize.css';
import 'semantic-ui-css/semantic.css';
import '../styles/main.scss';
import Header from '../commons/header';
import Sidebar from '../commons/sidebar';
import NotificationContainer from '../commons/NotificationContainer.jsx';

class MainLayout extends React.Component {
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
                <NotificationContainer
                    isMobile={this.state.isMobile}
                />
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: PropTypes.object,
    routes: PropTypes.array,
    params: PropTypes.object
};

export default MainLayout;
