import React, { PropTypes } from 'react';
import Table from '../../../commons/table';
import Button from '../../../commons/Button';
import List from '../../../commons/list';
import ListItem from '../../../commons/list/listItem';
import FluidListItem from '../../../commons/list/fluidListItem';
import FluidListHtmlItem from '../../../commons/list/fluidListHtmlItem';

const createColumnObject = (props) => {
    const columnNames = {
        valid: 'Valid',
        fullName: 'Name'
    };
    if (props.medium === 'SMS') columnNames.phoneNumber = 'Phone Number';
    if (props.medium === 'EMAIL') columnNames.email = 'Email';
    return columnNames;
};

const validateRecipients = (props) => (
    props.recipients.map(user => ({
        firstname: user.firstname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        lastname: user.lastname,
        fullName: user.fullName,
        id: user.id,
        valid: true
    }))
);

const Recipients = (props) => (
    <div>
        <div style={{ marginTop: 20 }} className="ui large header">Message</div>
        <List>
            <ListItem
                name="Type"
                icon="send"
                content={props.medium}
            />
            {props.medium === 'SMS' && <ListItem
                name="Sender"
                icon="user"
                content={props.sender}
            />}
            {props.medium === 'SMS' && <FluidListItem
                name="Message"
                icon="text file"
                content={props.message}
            />}
            {props.medium === 'EMAIL' && <ListItem
                name="Subject"
                icon="mail"
                content={props.subject}
            />}
            {props.medium === 'EMAIL' && <FluidListHtmlItem
                name="Message"
                icon="text file"
                content={props.message}
            />}
        </List>
        <div style={{ marginTop: 20 }} className="ui large header">Recipients</div>
        <Table
            columnNames={createColumnObject(props)}
            link={{
                columnName: 'fullName',
                prefix: '/admin/users/'
            }}
            labels={{
                valid: {
                    true: (
                        <div className="ui green label">
                            <i className="checkmark icon"></i>
                            Valid
                        </div>
                    ),
                    false: (
                        <div className="ui red label">
                            <i className="remove icon"></i>
                            Invalid
                        </div>
                    )
                }
            }}
            itemKey="id"
            items={validateRecipients(props)}
        />
        <Button fluid style={{ marginTop: 40 }} onClick={(e) => props.onSend(e)} color="green">
            Send messages
        </Button>
    </div>
);

Recipients.propTypes = {
    recipients: PropTypes.array,
    medium: PropTypes.string,
    onSend: PropTypes.func,
    sender: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string
};

export default Recipients;
