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
import Profile from './sections/profile';
import ViewUser from './commons/user/viewUser';
import EditUser from './commons/user/editUser';
import Destination from './sections/admin/destinations/destination';
import EditDestination from './sections/admin/destinations/destination/editDestination';
import DestinationVolunteers from './sections/admin/destinations/destination/volunteers';
import DestinationEmails from './sections/admin/destinations/destination/emailTemplates';
import DestinationAddVolunteer from './sections/admin/destinations/destination/addVolunteer';
import Destinations from './sections/admin/destinations';
import DestinationsTable from './sections/admin/destinations/destinationsTable';
import AddDestination from './sections/admin/destinations/addDestination';
import SignupTrip from './sections/trips/signup';
import Trips from './sections/trips/';
import Trip from './sections/trips/trip';
import TripRequests from './sections/admin/trips';
import AdminTrip from './sections/admin/trips/trip';
import EditTrip from './sections/trips/trip/editTrip';
import TripInfo from './sections/trips/trip/tripInfo';
import Email from './sections/admin/email';
import Users from './sections/admin/users';
import User from './sections/admin/users/user';
import TripsForUser from './sections/admin/users/user/tripsForUser';
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
                <Route name="My profile" path="/profile" component={Profile} >
                    <IndexRoute name="View profile" component={ViewUser} />
                    <Route name="Edit profile" path="edit" component={EditUser} />
                </Route>
                <Route name="Trips" path="/trips">
                    <IndexRoute component={Trips} />
                    <Route name="Sign up" path="signup" component={SignupTrip} />
                    <Route path=":tripId" component={Trip}>
                        <IndexRoute component={TripInfo} />
                        <Route name="edit" path="edit" component={EditTrip} />
                    </Route>
                </Route>
                <Route name="Destinations" path="admin/destinations">
                    <Route component={Destinations}>
                        <IndexRoute component={DestinationsTable} />
                        <Route path="new" component={AddDestination} name="Add destination" />
                    </Route>
                    <Route path=":destinationId" component={Destination}>
                        <IndexRoute component={DestinationVolunteers} />
                        <Route name="Edit destination" path="edit" component={EditDestination} />
                        <Route name="Emails" path="emails" component={DestinationEmails} />
                        <Route
                            name="Add volunteer"
                            path="addvolunteer"
                            component={DestinationAddVolunteer}
                        />
                    </Route>
                </Route>
                <Route name="Users" path="admin/users">
                    <IndexRoute component={Users} />
                    <Route path=":userId" component={User}>
                        <IndexRoute component={ViewUser} />
                        <Route name="Edit" path="edit" component={EditUser} />
                        <Route name="Trips" path="trips" component={TripsForUser} />
                    </Route>
                </Route>
                <Route name="Email" path="admin/email/:emailId" component={Email} />
                <Route name="Trips" path="admin/trips">
                    <IndexRoute component={TripRequests} />
                    <Route path=":tripId" component={AdminTrip} />
                </Route>
                <Route name="Not found" path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>
);
