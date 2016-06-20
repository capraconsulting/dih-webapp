/* eslint-disable new-cap, no-console, func-names, prefer-arrow-callback */

module.exports = function () { // eslint-disable-line
    this.When(/^I enter "(.*)" in field "(.*)"$/, (value, input) => {
        console.log(value);
        console.log(input);
        console.log(this.currentPage);
    });
};
