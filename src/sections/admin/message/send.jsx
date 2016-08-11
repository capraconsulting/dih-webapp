import React, { PropTypes, Component } from 'react';
import Button from '../../../commons/Button';
import Table from '../../../commons/table';

const createColumnObject = (props) => {
    const columnNames = {
        sent: 'Status',
        fullName: 'Name'
    };
    if (props.medium === 'SMS') columnNames.phoneNumber = 'Phone Number';
    if (props.medium === 'EMAIL') columnNames.email = 'Email';
    columnNames.error = 'Error';
    return columnNames;
};

const calulateProgress = (t) => {
    const inverse = (--t) * t * t + 1; // eslint-disable-line
    const value = 100 - inverse;
    if (value >= 100) return 100;
    return value;
};

class Recipients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    componentDidMount() {
        let t = 5.6;
        const update = setInterval(() => {
            const progressValue = calulateProgress(t);
            t -= 0.05;
            this.setState({ progress: progressValue });
            if (progressValue === 100) {
                this.setState({ progress: 100 });
                clearInterval(update);
            }
            if (this.props.sent && !this.props.sending) {
                this.setState({ progress: 100 });
                clearInterval(update);
            }
        }, 100);
    }

    createClasses() {
        let className = 'active';
        if (this.props.sent && !this.props.sending) {
            if (this.props.response.errors) className = 'error';
            else className = 'success';
        }
        return className;
    }

    generateLoadingMessage() {
        let message = `Sending ${this.props.medium.toLowerCase()}s`;
        if (this.props.sent && !this.props.sending) {
            if (this.props.response.errors) {
                message = `There was an error sending ${this.props.medium.toLowerCase()}'s`;
            } else {
                message = 'Sent!';
            }
        }
        return message;
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 20 }} className="ui large header">Sending</div>
                <div className={`ui blue progress ${this.createClasses()}`}>
                    <div
                        className="bar"
                        style={{ transitionDuration: '300ms', width: `${this.state.progress}%` }}
                    >
                        <div className="progress"></div>
                    </div>
                    <div className="label">{this.generateLoadingMessage()}</div>
                </div>
                {(this.props.sent && !this.props.sending) &&
                    <div>
                        <div className="ui large header">Recipients</div>
                        <Table
                            columnNames={createColumnObject(this.props)}
                            link={{
                                columnName: 'fullName',
                                prefix: '/admin/users/'
                            }}
                            labels={{
                                sent: {
                                    true: (
                                        <div className="ui green label">
                                            <i className="checkmark icon"></i>
                                            Sent
                                        </div>
                                    ),
                                    false: (
                                        <div className="ui red label">
                                            <i className="remove icon"></i>
                                            Error
                                        </div>
                                    )
                                }
                            }}
                            itemKey="id"
                            items={this.props.response.recipients}
                        />
                    </div>
                }
                <Button
                    style={{ marginTop: 40 }}
                    fluid
                    onClick={(e) => this.props.onReset(e)}
                    color="red"
                >
                    Reset
                </Button>
            </div>
        );
    }
}

Recipients.propTypes = {
    recipients: PropTypes.array,
    medium: PropTypes.string,
    onSend: PropTypes.func,
    response: PropTypes.object,
    sender: PropTypes.string,
    sending: PropTypes.bool,
    sent: PropTypes.bool,
    onReset: PropTypes.func,
    subject: PropTypes.string,
    message: PropTypes.string
};

export default Recipients;
