import React from 'react';

function PersonalInformation() {
    return (
        <div className="accordion-menu">
            <div className="accordion-header">Personal</div>
            <div className="accordion-content">
                <div className="row">
                    <div className="six columns">
                        <label htmlFor="personal-first-name">First name</label>
                        <input className="u-full-width" type="text" id="personal-first-name" />
                    </div>
                    <div className="six columns">
                        <label htmlFor="personal-last-name">Last name</label>
                        <input className="u-full-width" type="text" id="personal-last-name" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformation;
