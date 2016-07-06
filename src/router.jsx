import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import RootLayout from './layouts/Root';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import MyProfile from './sections/myProfile/MyProfile';
import LoginFormContainer from './sections/login/LoginFormContainer';
import DestinationContainer from './sections/admin/destinations/containers/DestinationContainer';
import Destinations from './sections/admin/destinations/Destinations';
import SignUpForm from './sections/signup/SignUpForm';
import SignupTrip from './sections/signupTrip/SignupTrip';
import TripRequests from './sections/admin/tripRequests/TripRequests';
import ConfirmSignUpFormContainer from './sections/signup/ConfirmSignUpFormContainer';
import NotFound from './commons/NotFound.jsx';

export default(
    <Router history={browserHistory}>
        <Route component={RootLayout}>
            <Route component={PublicLayout}>
                <Route path="/login" component={LoginFormContainer} />
                <Route path="/signup">
                    <IndexRoute component={SignUpForm} />
                    <Route path="/signup/confirm" component={ConfirmSignUpFormContainer} />
                </Route>
            </Route>
            <Route path="/" component={MainLayout}>
                <Route path="/profile" component={MyProfile} />
                <Route path="/trips/signup" component={SignupTrip} />
                <Route path="/admin/destinations" component={Destinations} />
                <Route path="/admin/destinations/:destinationId" component={DestinationContainer} />
                <Route path="/admin/trips" component={TripRequests} />
                <Route path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>
);
