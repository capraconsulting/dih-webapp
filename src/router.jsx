import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import RootLayout from './layouts/Root';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';

import Login from './sections/login';
import SignUp from './sections/signup';
import ConfirmSignUp from './sections/signup/confirm';
import ForgotPassword from './sections/forgotPassword';
import ForgotPasswordConfirm from './sections/forgotPassword/confirm';

import MyProfile from './sections/myProfile/MyProfile';
import Destination from './sections/admin/destinations/destination';
import Destinations from './sections/admin/destinations';
import SignupTrip from './sections/signupTrip';
import Trip from './sections/trips/trip';
import TripRequests from './sections/admin/tripRequests/TripRequests';
import Users from './sections/admin/users';
import User from './sections/admin/users/user';
import NotFound from './commons/NotFound.jsx';

export default(
    <Router history={browserHistory}>
        <Route component={RootLayout}>
            <Route component={PublicLayout}>
                <Route path="/login" component={Login} />
                <Route path="/password">
                    <IndexRoute component={ForgotPassword} />
                    <Route path="/password/confirm" component={ForgotPasswordConfirm} />
                </Route>
                <Route path="/signup">
                    <IndexRoute component={SignUp} />
                    <Route path="/signup/confirm" component={ConfirmSignUp} />
                </Route>
            </Route>
            <Route name="Main" path="/" component={MainLayout}>
                <Route name="My profile" path="profile" component={MyProfile} />
                <Route name="Trips" path="/trips">
                    <IndexRoute component={Trip} />
                    <Route name="Trip" path="/trips/trip/:tripId" component={Trip} />
                    <Route name="Sign up" path="/trips/signup" component={SignupTrip} />
                </Route>
                <Route name="Destinations" path="admin/destinations">
                    <IndexRoute component={Destinations} />
                    <Route path=":destinationId" component={Destination} />
                </Route>
                <Route name="Users" path="admin/users">
                    <IndexRoute component={Users} />
                    <Route path=":userId" component={User} />
                </Route>
                <Route name="Trips" path="admin/trips" component={TripRequests} />
                <Route name="My profile" path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>
);
