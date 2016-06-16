/* eslint-disable new-cap */
const URL = 'localhost:3000';

module.exports = function () { // eslint-disable-line
    this.Given(/^I open the page "(.*)"$/, (page) =>
        browser.url(URL + page)
    );
};
