import React, { PropTypes, Component } from 'react';
import Header from '../../../commons/pageHeader';
import Segment from '../../../commons/Segment';
import Segments from '../../../commons/Segments';
import Navbar from '../../../commons/navbar';

class AdminValues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    name: 'Admin values',
                    uri: '/admin/values'
                },
                {
                    name: 'Add new value',
                    uri: '/admin/values/new'
                }
            ]
        };
    }

    render() {
        return (
            <Segments>
                <Segment>
                    <Header
                        content="Admin values"
                        subContent="Show and edit all admin values"
                        icon="configure"
                    />
                </Segment>
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </Segments>
        );
    }
}

AdminValues.propTypes = {
    children: PropTypes.object
};

export default AdminValues;
