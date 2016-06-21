/* eslint-disable new-cap, no-console, func-names, prefer-arrow-callback */

module.exports = function () { // eslint-disable-line
    this.When(/^I set "(.*)" to the inputfield "(.*)"$/, (input, field) => {
        this.currentPage[field].setValue(input);
    });

    this.When(/^I press the button "(.*)"$/, (field) => {
        const button = this.currentPage[field];
        button();
    });

    this.When(/^I refresh the application$/, () => {
        browser.refresh();
    });
};
