import React from 'react';
import PublicHeader from '../commons/PublicHeader';

function SignUpLayout(props) {
    return (
        <div className="layout-public">
            <PublicHeader />
            <div className="ui card fluid">
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
