import React from 'react';

function Qualifications() {
    return (
        <div className="accordion-menu">
            <div className="accordion-header">Qualifications</div>
            <div className="accordion-content">
                <div className="ui card">
                    <div className="content">
                        <a className="header">Kristy</a>
                        <div className="meta">
                            <span className="date">Joined in 2013</span>
                        </div>
                        <div className="description">
                          Kristy is an art director living in New York.
                        </div>
                    </div>
                    <div className="extra content">
                        <a>
                            <i className="user icon"></i>
                            22 Friends
                        </a>
                    </div>
                </div>
                <button className="ui primary button large">Save</button>
                <button className="ui button">Discard</button>
            </div>
        </div>
    );
}

export default Qualifications;
