import React from 'react';

function SignUpLayout(props) {
    return (
        <div className="layout-public">
            <div className="ui card">
                <div className="content">
                    <h2>Sign up</h2>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

SignUpLayout.propTypes = {
    children: React.PropTypes.object
};

export default SignUpLayout;
