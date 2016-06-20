import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './layouts/MainLayout';
import MyProfile from './sections/my-profile/MyProfile';
import DestinationsContainer from './sections/destinations/DestinationsContainer';

import NotFound from './commons/NotFound';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <Route path="/profile" component={MyProfile} />
            <Route path="/admin/destinations" component={DestinationsContainer} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
