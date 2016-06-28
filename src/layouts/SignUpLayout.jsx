import React from 'react';

import DevTools from '../commons/DevTools';

function SignUpLayout(props) {
    return (
        <div className="layout-public">
            <div className="ui card fluid">
                <div className="content">
                    <h2>Sign up</h2>
                </div>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <DevTools />
        </div>
    );
}

SignUpLayout.propTypes = {
    children: React.PropTypes.object
};

export default SignUpLayout;
