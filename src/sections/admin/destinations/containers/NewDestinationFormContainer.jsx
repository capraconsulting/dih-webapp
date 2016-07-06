import React, { PropTypes } from 'react';
import { create, list } from '../../../../actions/destinationActions';
import { connect } from 'react-redux';

import NewDestinationForm from '../components/NewDestinationForm';

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

class NewDestinationFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            destinationName: ''
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newDestinationName = this.state.destinationName;
        if (!newDestinationName) {
            return;
        }

        this.handlers.create({ name: this.state.destinationName })
            .then(() => this.handlers.list());
        this.setState({
            destinationName: ''
        });
    }

    handleTextChange(e) {
        this.setState({
            destinationName: e.target.value
        });
    }

    render() {
        return (
            <NewDestinationForm
                destinationName={this.state.destinationName}
                handleSubmit={e => { this.handleSubmit(e); }}
                handleChange={e => { this.handleTextChange(e); }}
            />
        );
    }
}

NewDestinationFormContainer.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default connect()(NewDestinationFormContainer);
