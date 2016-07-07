import React, { PropTypes } from 'react';

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

class NewDestinationForm extends React.Component {
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
            <form id="newDestinationForm" onSubmit={event => { this.handleSubmit(event); }}>
                <h3>New destination</h3>
                <div className="ui action input">
                    <input
                        type="text"
                        id="destinationName"
                        placeholder="Destination name"
                        value={this.state.destinationName}
                        onChange={event => { this.handleTextChange(event); }}
                    />
                    <button id="save" className="ui button primary" type="submit">Add</button>
                </div>
            </form>
        );
    }
}

NewDestinationForm.propTypes = {
    destinationName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default NewDestinationForm;
