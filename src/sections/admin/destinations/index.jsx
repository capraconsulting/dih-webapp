import React, { PropTypes, Component } from 'react';
import Header from '../../../commons/pageHeader';
import Segment from '../../../commons/Segment';
import Segments from '../../../commons/Segments';
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
            <Segments>
                <Segment>
                    <Header
                        content="Destinations"
                        subContent="View and edit destinations"
                        icon="marker"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </Segments>
        );
    }
}

Destinations.propTypes = {
    children: PropTypes.object
};

export default Destinations;
