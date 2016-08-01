import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SignupTripForm from './SignupTripForm';
import Header from '../../../commons/pageHeader';
import { create } from '../../../actions/tripActions';
import { list } from '../../../actions/destinationActions';

const createHandlers = dispatch => ({
    create(data) {
        return dispatch(create(data));
    },
    list() {
        return dispatch(list());
    }
});

class SignupTripFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            errorMessage: null,
            successMessage: null
        };
    }

    componentDidMount() {
        this.handlers.list();
    }

    handleSubmit(data) {
        this.setState({
            isFetching: true
        });
        const trip = data;
        trip.wishStartDate = data.startDate; // Cannot be null, but not used anymore
        this.handlers.create(trip)
            .then(response => {
                let success = null;
                const { error } = response;
                if (!error) {
                    success = `We have registered your trip request and
                    will respond by email as soon as possible.`;
                }
                this.setState({
                    errorMessage: error,
                    isFetching: false,
                    successMessage: success
                });
            });
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        icon="plane"
                        subContent={`Sign up for a trip by filling in the form below,
                        we will get back to you for further information as fast as we can!`}
                        content="Sign up for a trip"
                    />
                </div>
                <div className="ui blue segment">
                    <SignupTripForm
                        destinations={this.props.destinations}
                        onSubmit={e => { this.handleSubmit(e); }}
                        errorMessage={this.state.errorMessage}
                        isFetching={this.state.isFetching}
                        successMessage={this.state.successMessage}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

SignupTripFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(SignupTripFormContainer);
