/* eslint-disable new-cap */

module.exports = function () { // eslint-disable-line
    this.Given(/^I open the page "(.*)"$/, (page) => browser.url(browser.options.baseUrl + page));
};
