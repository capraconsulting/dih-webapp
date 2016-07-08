/* eslint-disable new-cap, no-console, func-names, prefer-arrow-callback */

module.exports = function () { // eslint-disable-line
    this.When(/^I set "(.*)" to the inputfield "(.*)"$/, (input, field) => {
        this.currentPage[field].setValue(input);
    });

    this.When(/^I set "(.*)" to the datefield "(.*)"$/, (input, field) => {
        this.currentPage[field].setValue(input);
        browser.keys('Enter');
    });

    this.When(/^I press the button "(.*)"$/, (field) => {
        const button = this.currentPage[field];
        button();
    });

    this.When(/^I refresh the application$/, () => {
        browser.refresh();
    });

    this.When(/^I click the select "(.*)"$/, (field) => {
        const select = this.currentPage[field];
        select();
    });

    this.When(/^I click the option "(.*)" in selectfield "(.*)"$/, (text, field) => {
        const element = this.currentPage[field];
        element.selectByVisibleText(text);
        // browser.keys('Enter'); have to use this line in firefox for some reason
    });

    this.When(/^I submit the "(.*)"$/, (field) => {
        const form = this.currentPage[field];
        form.submitForm();
    });

    this.When(/^I press key "(.*)"$/, (key) => {
        browser.keys(key);
    });
};
