import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../../../commons/Editor';
import Header from '../../../commons/pageHeader';
import { retrieve, update } from '../../../actions/emailActions';

const createHandlers = dispatch => ({
    update(data) {
        return dispatch(update(data));
    },
    retrieve(emailId) {
        return dispatch(retrieve(emailId));
    }
});

class Email extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.emailId);
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Header
                        icon="mail"
                        content={this.props.email.name}
                        subContent={this.props.email.description}
                    />
                </div>
                <div className="ui blue segment">
                    <Editor html={this.props.email.html} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    email: store.emailState.email
});

Email.propTypes = {
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Email);
