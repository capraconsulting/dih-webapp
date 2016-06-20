import React from 'react';

class SignUpLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpLayout;
