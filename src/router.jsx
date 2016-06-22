import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './layouts/MainLayout';
import SignUpLayout from './layouts/SignUpLayout';
import MyProfile from './sections/my-profile/MyProfile';
import DestinationsContainer from './sections/destinations/DestinationsContainer';
import SignUpForm from './sections/signup/SignUpForm';
import NewTrip from './sections/newTrip/NewTrip';

import NotFound from './commons/NotFound.jsx';

export default(
    <Router history={browserHistory}>
        <Route path="/signup" component={SignUpLayout}>
            <IndexRoute component={SignUpForm} />
        </Route>
        <Route path="/" component={MainLayout}>
            <Route path="/profile" component={MyProfile} />
            <Route path="/admin/destinations" component={DestinationsContainer} />
            <Route path="/trips/new" component={NewTrip} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
