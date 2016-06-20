import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './layouts/MainLayout.jsx';
import MyProfile from './sections/my-profile/MyProfile.jsx';
import NewDestination from './sections/destinations/NewDestination.jsx';

import NotFound from './commons/NotFound.jsx';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={MainLayout}>
                    <Route path="/profile" component={MyProfile} />
                    <Route path="/admin/destinations" component={NewDestination} />
                    <Route path="*" component={NotFound} />
                </Route>
            </Router>
        );
    }
}

export default RouterComponent;
