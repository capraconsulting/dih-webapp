import React, { Component, PropTypes } from 'react';

import Segments from '../../../commons/Segments';
import Segment from '../../../commons/Segment';
import Header from '../../../commons/pageHeader';
import Navbar from '../../../commons/navbar';

class Trips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    name: 'All trips',
                    uri: '/admin/trips'
                },
                {
                    name: 'Requests',
                    uri: '/admin/trips/requests'
                }
            ]
        };
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        icon="plane"
                        content="Trips"
                        subContent="Manage and review trips from volunteers"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </Segments>
        );
    }
}

Trips.propTypes = {
    children: PropTypes.object
};

export default Trips;
