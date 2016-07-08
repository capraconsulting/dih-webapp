import React, { PropTypes, Component } from 'react';

import EmailTemplate from './emailTemplate';

class EmailTemplates extends Component {
    render() {
        return (
            <div>
                <EmailTemplate
                    header="Trip accepted"
                    subHeader="Sent to a volunteer if an admin accepts their trip request"
                    defaultTemplate="Herp derp"
                    handleSubmit={(e) => {
                        e.preventDefault();
                        console.log('handled!');
                    }}
                />

                <EmailTemplate
                    header="Trip rejected"
                    subHeader="Sent to a volunteer if an admin rejects their trip request"
                    defaultTemplate="Herp derp"
                    handleSubmit={(e) => {
                        e.preventDefault();
                        console.log('handled!');
                    }}
                />

                <EmailTemplate
                    header="Trip active"
                    subHeader="Sent to a volunteer when all necessary information has been filled"
                    defaultTemplate="Herp derp"
                    handleSubmit={(e) => {
                        e.preventDefault();
                        console.log('handled!');
                    }}
                />
            </div>

        );
    }
}

EmailTemplates.propTypes = {
    destinationId: PropTypes.number.isRequired
};

export default EmailTemplates;
