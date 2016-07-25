import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../../../commons/Editor';
import Header from '../../../commons/pageHeader';
import Button from '../../../commons/Button';
import { retrieve, update } from '../../../actions/emailActions';
import { pushNotification } from '../../../actions/notificationActions';

const createHandlers = dispatch => ({
    update(data) {
        return dispatch(update(data));
    },
    retrieve(emailId) {
        return dispatch(retrieve(emailId));
    },
    notification(message, level) {
        return dispatch(pushNotification(message, level));
    }
});

class Email extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
        this.state = {
            html: this.props.email.html
        };
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.emailId);
    }

    onChange(html) {
        this.setState({ html });
    }

    onSave(e) {
        e.preventDefault();
        const email = {
            id: this.props.email.id,
            html: this.state.html
        };
        this.handlers.update(email)
            .then(response => {
                const message = 'Email template saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
            });
    }

    onBack(e) {
        e.preventDefault();
        this.context.router.goBack();
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
                <div className="ui blue clearing segment">
                    <Editor onChange={(html => this.onChange(html))} html={this.props.email.html} />
                    <Button onClick={(e) => this.onSave(e)} color="green" right >Lagre</Button>
                    <Button onClick={(e) => this.onBack(e)} right >Tilbake</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    email: store.emailState.email
});

Email.contextTypes = {
    router: React.PropTypes.func.isRequired
};

Email.propTypes = {
    dispatch: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Email);
