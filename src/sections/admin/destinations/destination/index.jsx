import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { list } from '../../../../actions/destinationActions';
import Header from '../../../../commons/pageHeader';
import Navbar from '../../../../commons/navbar';
import NotFound from '../../../../commons/NotFound';

const createHandlers = (dispatch) => () => dispatch(list());

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
        this.handlers();
    }

    findDestination(destinations, destinationId) {
        const id = parseInt(destinationId, 10);
        for (const destination of destinations) {
            if (destination.id === id) {
                return destination;
            }
        }
        return false;
    }


    render() {
        const destination = this.findDestination(this.props.destinations
            , this.props.params.destinationId);
        if (destination === false) {
            return <NotFound />;
        }

        return (
            <div className="ui segment">
                <Header
                    icon="marker"
                    content={`${destination.name}`}
                    subContent="Manage destination"
                />
                <Navbar pages={this.state.pages} />
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

Destination.propTypes = {
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Destination);
