import React, { Component } from 'react';

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
            <div className="ui segment">
                <Header
                    icon="plane"
                    content="Trips"
                    subContent="Manage and review trips from volunteers"
                />
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </div>
        );
    }
}

export default Trips;
