/* eslint-disable new-cap, no-console */
const webdriverio = require('webdriverio');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.Should();
chai.use(chaiAsPromised);
const driver = webdriverio.remote({ desiredCapabilities: { browserName: 'firefox' } });
driver.init();

module.exports = function () { // eslint-disable-line
    this.Then(/^I expect that element "(.*)" does exist$/, (selector) => {
        driver
            .waitForExist(selector, 1000)
            .elements(selector)
            .then(elements => {
                console.log();
                console.log(elements);
            });
    });

    this.Then(/^I expect that element "(.*)" does not exist$/, (selector) =>
        driver
            .waitForExist(selector, 1000, true)
            .elements(selector)
            .then(elements => {
                console.log();
                console.log(elements);
            })
    );

    this.Then(/^I expect that title is equal to "(.*)"$/, (title) =>
        driver
            .getTitle()
            .then(response => {
                console.log(response);
                console.log(title);
            })
    );
};
