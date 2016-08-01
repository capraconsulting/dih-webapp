import React, { PropTypes, Component } from 'react';
import Header from '../../../commons/pageHeader';
import Navbar from '../../../commons/navbar';

class Destinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    name: 'Destinations',
                    uri: '/admin/destinations'
                },
                {
                    name: 'Add destination',
                    uri: '/admin/destinations/new'
                }
            ]
        };
    }

    render() {
        return (
            <div className="ui segment">
                <Header
                    content="Destinations"
                    subContent="View and edit destinations"
                    icon="marker"
                />
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </div>
        );
    }
}

Destinations.propTypes = {
    children: PropTypes.object
};

export default Destinations;
