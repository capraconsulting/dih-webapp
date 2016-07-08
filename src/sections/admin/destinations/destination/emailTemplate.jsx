import React, { PropTypes } from 'react';

function EmailTemplate(props) {
    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={props.handleSubmit}>
                <h3 className="ui header">
                    {props.header}
                    <div className="sub header">{props.subHeader}</div>
                </h3>
                <div className="field">
                    <textarea rows="10" placeholder={props.defaultTemplate}></textarea>
                </div>
                <button className="ui button primary" type="submit">Save</button>
            </form>
        </div>
    );
}

EmailTemplate.propTypes = {
    header: PropTypes.string.isRequired,
    subHeader: PropTypes.string.isRequired,
    defaultTemplate: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default EmailTemplate;
