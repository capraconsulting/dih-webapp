import React from 'react';

function SignUpLayout(props) {
    return (
        <div>
            <div className="wrapper">
                <div className="main-content">
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
