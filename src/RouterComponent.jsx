import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './Main.jsx';
import MyProfile from './sections/my-profile/MyProfile.jsx';
import NewDestination from './sections/destinations/NewDestination.jsx';

class RouterComponent extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={MyProfile} />
                    <Route path="/admin/destinations" component={NewDestination} />
                </Route>
            </Router>
        );
    }
}

export default RouterComponent;
