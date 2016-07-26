import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { retrieve } from '../../../../actions/destinationActions';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';

const createHandlers = (dispatch) => (id) => dispatch(retrieve(id));

class Destination extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            pages: [
                {
                    name: 'Volunteers',
                    uri: `/admin/destinations/${this.props.params.destinationId}`
                },
                {
                    name: 'Email templates',
                    uri: `/admin/destinations/${this.props.params.destinationId}/emails`
                }
            ]
        };
    }

    componentDidMount() {
        this.handlers(this.props.params.destinationId);
    }

    render() {
        return (
            <div className="ui segment">
                <Header
                    icon="marker"
                    content={this.props.destination.name}
                    subContent="Manage destination"
                />
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination
});

Destination.propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    destination: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Destination);
