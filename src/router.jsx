import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import MainLayout from './layouts/MainLayout';
import SignUpLayout from './layouts/SignUpLayout';
import MyProfile from './sections/myProfile/MyProfile';
import Destinations from './sections/destinations/Destinations';
import SignUpForm from './sections/signup/SignUpForm';
import SignupTrip from './sections/signupTrip/SignupTrip';
import TripRequestsContainer from './sections/tripRequests/TripRequestsContainer';
import ConfirmSignUpFormContainer from './sections/signup/ConfirmSignUpFormContainer';
import NotFound from './commons/NotFound.jsx';

export default(
    <Router history={browserHistory}>
        <Route path="/signup" component={SignUpLayout}>
            <IndexRoute component={SignUpForm} />
            <Route path="/signup/confirm" component={ConfirmSignUpFormContainer} />
        </Route>
        <Route path="/" component={MainLayout}>
            <Route path="/profile" component={MyProfile} />
            <Route path="/trips/signup" component={SignupTrip} />
            <Route path="/admin/destinations" component={Destinations} />
            <Route path="/admin/trips" component={TripRequestsContainer} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
