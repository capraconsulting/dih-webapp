import React, { PropTypes } from 'react';

const Account = (props) => (
    <div className="item account">
        <h4 className="ui header">
            <i className="child icon"></i>
            <div className="content">
                {`${props.account.firstname} ${props.account.lastname}`}
                <div className="sub header">{props.account.role}</div>
            </div>
        </h4>
        <div className="menu">
            <a onClick={props.onLogout} className="item">
                Logout
            </a>
            <a
                href="https://docs.google.com/document/d/1Mp4V6ljP-TgCTstW_ZamJ-EuGM9J6JfYfVraKi7IO4Y/pub"
                className="item"
            >
                Help
            </a>
        </div>
    </div>
);


Account.propTypes = {
    onLogout: PropTypes.func.isRequired,
    account: PropTypes.object.isRequired
};

export default Account;
