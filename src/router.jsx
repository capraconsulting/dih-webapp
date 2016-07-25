import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import RootLayout from './layouts/Root';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import MyProfile from './sections/myProfile/MyProfile';
import LoginFormContainer from './sections/login/LoginFormContainer';
import Destination from './sections/admin/destinations/destination';
import DestinationVolunteers from './sections/admin/destinations/destination/volunteers';
import DestinationEmails from './sections/admin/destinations/destination/emailTemplates';
import Destinations from './sections/admin/destinations';
import SignUpForm from './sections/signup/SignUpForm';
import SignupTrip from './sections/signupTrip/SignupTrip';
import TripRequests from './sections/admin/tripRequests/TripRequests';
import Email from './sections/admin/email';
import Users from './sections/admin/users';
import User from './sections/admin/users/user';
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
            <Route name="Main" path="/" component={MainLayout}>
                <Route name="My profile" path="profile" component={MyProfile} />
                <Route name="My trips" path="trips/signup" component={SignupTrip} />
                <Route name="Destinations" path="admin/destinations">
                    <IndexRoute component={Destinations} />
                    <Route path=":destinationId" component={Destination}>
                        <IndexRoute component={DestinationVolunteers} />
                        <Route name="Emails" path="emails" component={DestinationEmails} />
                    </Route>
                </Route>
                <Route name="Users" path="admin/users">
                    <IndexRoute component={Users} />
                    <Route path=":userId" component={User} />
                </Route>
                <Route name="Email" path="admin/email" component={Email} />
                <Route name="Trips" path="admin/trips" component={TripRequests} />
                <Route name="My profile" path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>
);
