import React from 'react';

function PersonalInformation() {
    return (
        <div className="ui segments">
            <div className="ui blue inverted segment header">
                <h2>Personal</h2>
            </div>
            <div className="ui segment">
                <form className="ui form">
                    <div className="ui grid">
                        <div className="eight wide column">
                            <div className="field">
                                <label htmlFor="personal-first-name">First name</label>
                                <input type="text" id="personal-first-name" />
                            </div>
                            <div className="field">
                                <label htmlFor="personal-last-name">Last name</label>
                                <input type="text" id="personal-last-name" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalInformation;
