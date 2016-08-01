import React from 'react';
import PublicHeader from '../commons/PublicHeader';
import PublicFooter from '../commons/PublicFooter';

function SignUpLayout(props) {
    return (
        <div>
            <PublicHeader />
            <div className="layout-public">
                <div className="ui card fluid">
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </div>
            <PublicFooter />
        </div>
    );
}

SignUpLayout.propTypes = {
    children: React.PropTypes.object
};

export default SignUpLayout;
