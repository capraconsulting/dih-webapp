import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Steps from '../../../commons/Steps';
import Step from '../../../commons/Steps/Step';
import { list } from '../../../actions/userActions';
import { addRecipients, addMessageData, reset, send } from '../../../actions/messageActions';

const createHandlers = (dispatch) => (
    {
        list() {
            return dispatch(list());
        },
        addRecipients(users) {
            return dispatch(addRecipients(users));
        },
        addMessageData(data) {
            return dispatch(addMessageData(data));
        },
        send(data) {
            return dispatch(send(data));
        },
        reset(data) {
            return dispatch(reset(data));
        }
    }
);

class Compose extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.list();
    }

    componentWillUnmount() {
        this.handlers.reset();
    }

    onSave(data) {
        const messageData = {
            medium: data.medium
        };
        if (messageData.medium === 'EMAIL') {
            messageData.message = data.emailMessage;
            messageData.subject = data.subject;
        }
        if (messageData.medium === 'SMS') {
            messageData.sender = data.sender;
            messageData.message = data.textMessage;
        }
        this.handlers.addMessageData(messageData);
        browserHistory.push('/admin/message/summary');
    }

    onSend() {
        const data = {
            medium: this.props.medium,
            sender: this.props.sender,
            message: this.props.message,
            subject: this.props.subject,
            recipients: this.props.recipients
        };
        this.handlers.send(data);
        browserHistory.push('/admin/message/send');
    }

    onReset() {
        this.handlers.reset();
        browserHistory.push('/admin/message/recipients');
    }

    validateRecipients() {
        let className = '';
        if (this.props.recipients.length > 0) className = 'completed';
        return className;
    }

    validateMessage() {
        let className = '';
        if (this.props.medium === 'EMAIL') {
            className = 'completed';
            if (!this.props.message) {
                className = '';
            }
        }
        if (this.props.medium === 'SMS') {
            className = 'completed';
            if (!this.props.sender) {
                className = '';
            }
            if (!this.props.message) {
                className = '';
            }
        }
        return className;
    }

    validateSummary() {
        let className = '';
        if (this.props.sent) className = 'completed';
        return className;
    }

    validateSend() {
        let className = '';
        if (this.props.sent && !this.props.sending) {
            if (!this.props.response.errors) {
                className = 'completed';
            }
        }
        return className;
    }

    render() {
        return (
            <div className="ui segments">
                <div className="ui segment">
                    <Steps numberOfSteps="four" >
                        <Step
                            title="Recipients"
                            validate={this.validateRecipients()}
                            description="Select recipients of the message"
                            uri="/admin/message/recipients"
                            icon="users"
                        />
                        <Step
                            title="Compose"
                            validate={this.validateMessage()}
                            description="Write a message to send to selected users"
                            uri="/admin/message/compose"
                            icon="edit"
                        />
                        <Step
                            title="Summary"
                            validate={this.validateSummary()}
                            description="Check if message and recipients checks out"
                            uri="/admin/message/summary"
                            icon="file text"
                        />
                        <Step
                            title="Send"
                            validate={this.validateSend()}
                            description="Send message to recipients"
                            uri="/admin/message/send"
                            icon="send"
                        />
                    </Steps>
                </div>
                <div className="ui blue clearing segment">
                    {React.cloneElement(this.props.children, {
                        recipients: this.props.recipients,
                        users: this.props.users,
                        initialValues: {
                            medium: this.props.medium,
                            subject: this.props.subject,
                            sender: this.props.sender,
                            textMessage: this.props.message,
                            emailMessage: this.props.message
                        },
                        sent: this.props.sent,
                        sending: this.props.sending,
                        response: this.props.response,
                        medium: this.props.medium,
                        subject: this.props.subject,
                        message: this.props.message,
                        sender: this.props.sender,
                        onSubmit: e => this.onSave(e),
                        onSend: e => this.onSend(e),
                        onReset: e => this.onReset(e),
                        addRecipients: this.handlers.addRecipients
                    })}
                </div>
            </div>
        );
    }
}


const mapStateToProps = store => ({
    recipients: store.messageState.recipients,
    sending: store.messageState.sending,
    sent: store.messageState.sent,
    subject: store.messageState.subject,
    response: store.messageState.response,
    users: store.userState.users,
    medium: store.messageState.medium,
    message: store.messageState.message,
    sender: store.messageState.sender
});

Compose.propTypes = {
    recipients: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    sending: PropTypes.bool,
    sent: PropTypes.bool,
    response: PropTypes.object,
    medium: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    sender: PropTypes.string
};

export default connect(mapStateToProps)(Compose);
