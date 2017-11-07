import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// layouts
import RootLayout from './layouts/Root';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';

// public
import Login from './sections/login';
import SignUp from './sections/signup';
import ConfirmSignUp from './sections/signup/confirm';
import ForgotPassword from './sections/forgotPassword';
import ForgotPasswordConfirm from './sections/forgotPassword/confirm';

// user
import Profile from './sections/profile';
import ViewUser from './commons/user/viewUser';
import EditUser from './commons/user/editUser';
import DeleteUser from './commons/user/deleteUser';

import SignupTrip from './sections/trips/signup';
import Trips from './sections/trips/';
import Trip from './sections/trips/trip';

import CancelTrip from './sections/trips/trip/cancelTrip';
import TripInfo from './commons/trip/tripInfo';
import EditTrip from './commons/trip/editTrip';

// Coordinator
import CoordinatorDestinations from './sections/coordinator/destinations';
import CoordinatorDestination from './sections/coordinator/destinations/destination';
import CoordinatorTrip from './sections/coordinator/trips/trip';
import EditNotes from './sections/coordinator/trips/trip/notes';

// admin
import Users from './sections/admin/users';
import User from './sections/admin/users/user';
import TripsForUser from './sections/admin/users/user/tripsForUser';

import Destinations from './sections/admin/destinations';
import Destination from './sections/admin/destinations/destination';
import EditDestination from './sections/admin/destinations/destination/editDestination';
import DestinationVolunteers from './sections/admin/destinations/destination/volunteers';
import DestinationEmails from './sections/admin/destinations/destination/emailTemplates';
import DestinationAddVolunteer from './sections/admin/destinations/destination/addVolunteer';
import DestinationCoordinators from './sections/admin/destinations/destination/coordinators';
import DestinationsTable from './sections/admin/destinations/destinationsTable';
import AddDestination from './sections/admin/destinations/addDestination';

import AdminTrip from './sections/admin/trips/trip';
import TripStatus from './sections/admin/trips/trip/tripStatus';

import AdminTrips from './sections/admin/trips';
import AdminTripsAll from './sections/admin/trips/allTrips';
import AdminTripsRequests from './sections/admin/trips/tripRequests';

import AdminValues from './sections/admin/adminValues';
import AdminValuesTable from './sections/admin/adminValues/adminValuesTable';
import AddAdminValue from './sections/admin/adminValues/addAdminValue';

import Email from './sections/admin/email';
import Message from './sections/admin/message';
import RecipientsMessage from './sections/admin/message/recipients';
import ComposeMessage from './sections/admin/message/compose';
import MessageSummary from './sections/admin/message/summary';
import MessageSend from './sections/admin/message/send';

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
                    <Route name="Delete profile" path="delete" component={DeleteUser} />
                </Route>
                <Route name="Trips" path="/trips">
                    <IndexRoute component={Trips} />
                    <Route name="Sign up" path="signup" component={SignupTrip} />
                    <Route path=":tripId" component={Trip}>
                        <IndexRoute component={TripInfo} />
                        <Route name="Edit" path="edit" component={EditTrip} />
                        <Route name="Cancel" path="cancel" component={CancelTrip} />
                    </Route>
                </Route>

                <Route name="Destinations" path="coordinator/destinations">
                    <IndexRoute component={CoordinatorDestinations} />
                    <Route path=":destinationId" component={CoordinatorDestination} />
                </Route>
                <Route name="Trips" path="coordinator/trips/:tripId" component={CoordinatorTrip}>
                    <IndexRoute component={TripInfo} />
                    <Route
                        name="View user"
                        path="user"
                        component={ViewUser}
                    />
                    <Route name="Notes" path="notes" component={EditNotes} />
                </Route>

                <Route name="Destinations" path="admin/destinations">
                    <Route component={Destinations}>
                        <IndexRoute component={DestinationsTable} />
                        <Route path="new" component={AddDestination} name="Add destination" />
                    </Route>
                    <Route path=":destinationId" component={Destination}>
                        <IndexRoute component={DestinationVolunteers} />
                        <Route name="Edit destination" path="edit" component={EditDestination} />
                        <Route
                            name="Destination emails"
                            path="emails"
                            component={DestinationEmails}
                        />
                        <Route
                            name="Add volunteer"
                            path="addvolunteer"
                            component={DestinationAddVolunteer}
                        />
                        <Route
                            name="Coordinators"
                            path="coordinators"
                            component={DestinationCoordinators}
                        />
                    </Route>
                </Route>

                <Route name="Users" path="admin/users">
                    <IndexRoute component={Users} />
                    <Route path=":userId" component={User}>
                        <IndexRoute component={ViewUser} />
                        <Route name="Edit user" path="edit" component={EditUser} />
                        <Route name="Delete user" path="delete" component={DeleteUser} />
                        <Route name="See user trips" path="trips" component={TripsForUser} />
                    </Route>
                </Route>

                <Route name="Message" path="admin/message" component={Message}>
                    <Route name="Recipients" path="recipients" component={RecipientsMessage} />
                    <Route name="Compose" path="compose" component={ComposeMessage} />
                    <Route name="Summary" path="summary" component={MessageSummary} />
                    <Route name="Send" path="send" component={MessageSend} />
                </Route>

                <Route name="Email" path="admin/email/:emailId" component={Email} />

                <Route name="Trips" path="admin/trips" component={AdminTrips}>
                    <IndexRoute component={AdminTripsAll} />
                    <Route name="Trip requests" path="requests" component={AdminTripsRequests} />
                </Route>
                <Route path="admin/trips/:tripId" component={AdminTrip}>
                    <IndexRoute component={TripStatus} />
                    <Route name="user" path="user" component={ViewUser} />
                    <Route name="edit" path="edit" component={EditTrip} />
                </Route>

                <Route name="AdminValues" path="admin/values" component={AdminValues}>
                    <IndexRoute component={AdminValuesTable} />
                    <Route name="new" path="new" component={AddAdminValue} />
                </Route>
                <Route name="Not found" path="*" component={NotFound} />
            </Route>
        </Route>
    </Router>
);
