import React from 'react';
import PublicHeader from '../commons/PublicHeader';

function SignUpLayout(props) {
    return (
        <div>
            <div className="to-frontpage">
                <a href="http://drapenihavet.no">
                    <i className="icon angle left"></i>
                    Back to frontpage
                </a>
            </div>
            <div className="layout-public">
                <PublicHeader />
                <div className="ui card fluid">
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

SignUpLayout.propTypes = {
    children: React.PropTypes.object
};

export default SignUpLayout;
