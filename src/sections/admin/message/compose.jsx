import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../../../commons/Form';
import TextField from '../../../commons/Form/TextField';
import Button from '../../../commons/Button';
import HtmlField from '../../../commons/Form/HtmlField';
import InputField from '../../../commons/Form/InputField';
import SelectField from '../../../commons/Form/SelectField';

const fields = ['medium', 'subject', 'textMessage', 'emailMessage', 'sender'];

const messageMediums = [
    {
        name: 'Email',
        medium: 'EMAIL'
    },
    {
        name: 'SMS',
        medium: 'SMS'
    }
];

const validate = values => {
    const errors = {};
    if (!values.medium) {
        errors.medium = 'Required';
    }
    if (values.medium === 'EMAIL') {
        if (!values.emailMessage) {
            errors.emailMessage = 'Required';
        }
        if (!values.subject) {
            errors.subject = 'Required';
        }
    }
    if (values.medium === 'SMS') {
        if (!values.sender) {
            errors.sender = 'Required';
        }
        if (!values.textMessage) {
            errors.textMessage = 'Required';
        }
    }
    return errors;
};

function ComposeMessage(props) {
    const {
        fields: { medium, subject, textMessage, emailMessage, sender },
        handleSubmit
    } = props;

    return (
        <Form
            id="composeMessageform"
            handleSubmit={handleSubmit}
        >
            <SelectField
                label="Message medium"
                values={messageMediums}
                placeholder="Select a message medium"
                valueLabel="name"
                defaultValue=""
                valueKey="medium"
            >
                {medium}
            </SelectField>
            {medium.value === 'SMS' &&
                <InputField type="text" label="Sender" >
                    {sender}
                </InputField>
            }
            {medium.value === 'SMS' &&
                <TextField rows={3} label="SMS message">
                    {textMessage}
                </TextField>
            }
            {medium.value === 'EMAIL' &&
                <InputField type="text" label="Subject" >
                    {subject}
                </InputField>
            }
            {medium.value === 'EMAIL' &&
                <HtmlField rows={3} label="Email message">
                    {emailMessage}
                </HtmlField>
            }
            <Button
                type="submit"
                color="green"
                fluid
                id="submit"
            >
                Save
            </Button>
        </Form>
    );
}

ComposeMessage.propTypes = {
    fields: PropTypes.object.isRequired,
    medium: PropTypes.string,
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'ComposeMessage',
    fields,
    validate
})(ComposeMessage);
