/* eslint-disable new-cap, no-console, func-names, prefer-arrow-callback */

module.exports = function () { // eslint-disable-line
    this.When(/^I set "(.*)" to the inputfield "(.*)"$/, (input, field) => {
        this.currentPage[field].setValue(input);
    });
};
