import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SignupTripForm from './SignupTripForm';
import { create } from '../../actions/tripActions';
import { list } from '../../actions/destinationActions';

const createHandlers = (dispatch) => (
    {
        create(data) {
            return dispatch(create(data));
        },
        list() {
            return dispatch(list());
        }
    }
);

class SignupTripFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.list();
    }
    handleSubmit(data) {
        this.handlers.create(data);
    }

    render() {
        return (
            <SignupTripForm
                destinations={this.props.destinations}
                onSubmit={e => { this.handleSubmit(e); }}
            />
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
