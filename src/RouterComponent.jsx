import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './layouts/MainLayout.jsx';
import SignUpLayout from './layouts/SignUpLayout.jsx';
import MyProfile from './sections/my-profile/MyProfile.jsx';
import NewDestination from './sections/destinations/NewDestination.jsx';
import SignUpForm from './sections/signup/SignUpForm.jsx';

import NotFound from './commons/NotFound.jsx';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/signup" component={SignUpLayout}>
                    <IndexRoute component={SignUpForm} />
                </Route>
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
